import {
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    Directive,
} from '@angular/core';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';
import { Router, NavigationStart, ActivatedRoute, UrlSegment } from '@angular/router';
import { resolve } from './services/factory-resolver.utils';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { filter, take } from 'rxjs/operators';
import { LazyComponent } from '.';
import { NbAuthService } from '@nebular/auth';

/**
 * @description - A class to be extended by angular Components. It encapsulates the core methods to create admin dashboards
 */
@Directive()
export abstract class AdminApp {
    @ViewChild(AdminMainDirective, { read: ViewContainerRef })
    private appSelector: ViewContainerRef;

    @ViewChild(AdminMainDirective, { static: false })
    private adminMain: AdminMainDirective;

    private appRef: ComponentRef<AdminAppComponent>;
    private appInstance: AdminAppComponent;

    private routePair: Map<string, LazyComponent<unknown>>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private nbMenuService: NbMenuService,
        private router: Router,
        private nbAuth: NbAuthService
    ) {}

    /**
     *
     * @description - Add items to the tab menu, items listed through this method will be visible in the main interface.
     *
     * @see {@link https://akveo.github.io/eva-icons/#/}
     *
     * @example
     *
     * ngAfterViewInit() {
     *   this.registerRoute('/pages/a', PageAComponent);
     *   this.registerRoute('/pages/b', PageBComponent);
     *
     *   this.build();
     *
     *   this.addMenuItem([
     *     {
     *       title: 'page C',
     *       link: 'pages/c',
     *     },
     *   ]);
     *
     *   this.registerRoute('/pages/c', PageCComponent);
     * }
     */
    public addMenuItem(items: NbMenuItem[]): void {
        this.nbMenuService.addItems(items, 'menu');
    }

    /**
     * @description Manually triggers a navigation action to the specified route, the related component is then lazy loaded.
     *
     * @param route Route to navigate to, this route should be registered before use.
     */
    public goToRoute<T>(route: string): void {
        this.appInstance.createComponent(this.routePair.get(route));

        this.appRef.changeDetectorRef.detectChanges();
    }

    /**
     *
     * @param route route to register
     * @param component component to load on NavigationStart by clicking the tab menu.
     *
     * @example
     *
     * ngAfterViewInit() {
     *   this.registerRoute('/pages/a', PageAComponent);
     *   this.registerRoute('/pages/b', PageBComponent);
     *
     *   this.build();
     *
     *   this.addMenuItem([
     *     {
     *       title: 'page C',
     *       link: 'pages/c',
     *     },
     *   ]);
     *
     *   this.registerRoute('/pages/c', PageCComponent);
     * }
     */
    public registerRoute(route, config: LazyComponent<unknown>): void {
        if (!this.routePair) {
            this.routePair = new Map<string, LazyComponent<unknown>>();
        }

        this.routePair.set(route, config);
    }

    /**
     * @description "Instantiates" the admin panel with the routes provided with @see {@link registerRoute} method.
     *
     * Further routing and menu options could be provided in execution time using {@link addMenuItem}
     *
     * To make your dashboard app selector with admin-main directive available,
     * make sure this method is called within the NgAfterViewInit Hook.
     */

    public build(options?) {
        const { enableAuthentication } = options || {};

        if (!this.appSelector) {
            throw Error(
                `No valid selector provided, are you building your dashboard within
                the component\'s NgAfterViewInit Hook or using \'admin-main\' directive?`
            );
        }

        this.appRef = this.appSelector.createComponent(
            resolve<AdminAppComponent>(this.resolver, AdminAppComponent)
        );

        this.nbAuth.onAuthenticationChange().subscribe((status) => {
            if (status === false) {
                this.router.navigate(['/auth/login'])
            }
        })

        this.appInstance = this.appRef.instance;
        this.appInstance.menu = this.adminMain.menuItems;
        this.appInstance.enableAuthentication = enableAuthentication;
  
        this.appInstance.fakeRouterInitialized$.subscribe((container) => {
            this.appInstance.fakeRouterContainer = container as ViewContainerRef;
            this.appInstance = this.appRef.instance;

            if (enableAuthentication) {
                if (!this.routePair.get('/auth/login')) {
                    throw "Register the route '/auth/login' with the component of your choice to enable authentication";
                }

                this.nbAuth.isAuthenticated().subscribe((isAuth) => {
                    if (!isAuth) {
                        this.appInstance.menuEnabled = false;
                        this.goToRoute('/auth/login');
                        this.appRef.changeDetectorRef.detectChanges();
                    } else {
                        this.appInstance.menuEnabled = true;
                        if (this.router.url === '/auth/login') {
                            this.goToRoute(this.routePair.keys().next().value);
                        } else {
                            this.goToRoute(this.router.url);
                        }
                    }
                });
            } else {
                this.appInstance.menuEnabled = true;
            }

            // this.goToRoute(this.router.url);

            /*
                triggers on routerLink
            */
            this.router.events
                .pipe(
                    filter((evt) => {
                        return evt instanceof NavigationStart;
                    })
                )
                .subscribe((navigation: NavigationStart) => {
                    if(enableAuthentication) {
                        this.nbAuth.isAuthenticated().subscribe((isAuth) => {
                            if (isAuth) {
                                this.appInstance.menuEnabled = true;
    
                                if (navigation.url === '') {
                                    this.goToRoute(this.routePair.keys().next().value);
                                } else {
                                    let keys = Array.from(this.routePair.keys());
                                    if (keys.indexOf(navigation.url) !== -1) {
                                        this.goToRoute(navigation.url);
                                    } else {
                                        this.goToRoute(this.routePair.keys().next().value);
                                    }
                                }
                            }
    
                            if (!isAuth) {
                                this.appInstance.menuEnabled = false;
                                this.goToRoute('auth/login');
                            }
                        });
                    } else {
                        this.goToRoute(navigation.url);
                    }

                    
                });
        });

        this.appRef.changeDetectorRef.detectChanges();
    }
}
