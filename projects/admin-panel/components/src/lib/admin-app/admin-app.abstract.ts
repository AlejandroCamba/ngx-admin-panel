import {
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
} from '@angular/core';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';
import { Router, NavigationStart } from '@angular/router';
import { resolve } from './services/factory-resolver.utils';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { filter } from 'rxjs/operators';

/**
 * @description - A class to be extended by angular Components. It encapsulates the core methods to create admin dashboards
 */
export abstract class AdminApp {
    @ViewChild(AdminMainDirective, { read: ViewContainerRef })
    private appSelector: ViewContainerRef;

    @ViewChild(AdminMainDirective, { static: false })
    private adminMain: AdminMainDirective;

    private appRef: ComponentRef<AdminAppComponent>;
    private appInstance: AdminAppComponent;

    private routePair: Map<string, Type<unknown>>;

    /**
     * .
     * @constructor
     * @param {ComponentFactoryResolver} resolver Lazy Component creator
     * @param {NbMenuService} nbMenuService Nebular menu manipulation service.
     * @param {Router} router Angular router service...
     */
    constructor(
        private resolver: ComponentFactoryResolver,
        private nbMenuService: NbMenuService,
        private router: Router
    ) {}

    /**
     *
     * @description - Add items to the tab menu, items listed through this method will be visible in the main interface.
     *
     * @param {NbMenuItem[]} items -  List of items to add, for API reference 
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
        if (this.appInstance.fakeRouterContainer) {
            this.appInstance.fakeRouterContainer.clear();
        }

        const lazyComponent = this.routePair.get(route);

        this.appInstance.fakeRouterContainer.createComponent(
            resolve<T>(this.resolver, lazyComponent as Type<T>)
        );

        this.appRef.changeDetectorRef.markForCheck();
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
    public registerRoute(route, component): void {
        if (!this.routePair) {
            this.routePair = new Map<string, Type<unknown>>();
        }

        this.routePair.set(route, component);
    }

    /**
     * @description "Instantiates" the admin panel with the routes provided with @see {@link registerRoute} method.
     *
     * Further routing and menu options could be provided in execution time using {@link addMenuItem}
     *
     * To make your dashboard app selector with admin-main directive available, make sure this method is called within the NgAfterViewInit Hook.
     */
    public build() {
        if (!this.appSelector) {
            throw Error(
                'No valid selector provided, are you building your dashboard within the component\'s NgAfterViewInit Hook or using \'admin-main\' directive?'
            );
        }

        this.appRef = this.appSelector.createComponent(
            resolve<AdminAppComponent>(this.resolver, AdminAppComponent)
        );
        this.appInstance = this.appRef.instance;

        this.appInstance.menu = this.adminMain.menuItems;
        this.appInstance.fakeRouterInitialized$.subscribe((container) => {
            this.appInstance.fakeRouterContainer = <ViewContainerRef>container;
            this.appRef.changeDetectorRef.markForCheck();
            this.appInstance = this.appRef.instance;

            this.router.events
                .pipe(
                    filter((evt) => {
                        return evt instanceof NavigationStart;
                    })
                )
                .subscribe((navigation: NavigationStart) => {
                    this.goToRoute(navigation.url);
                });
        });

        this.appRef.changeDetectorRef.markForCheck();
    }
}
