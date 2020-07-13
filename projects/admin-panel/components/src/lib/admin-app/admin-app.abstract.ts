import {
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    Directive,
    ComponentRef,
    Type,
} from '@angular/core';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';
import { Router, ResolveStart, NavigationStart } from '@angular/router';
import { LazyLoaderService } from './services/lazy-load.service';
import { resolve } from './services/factory-resolver.utils';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { filter } from 'rxjs/operators';

/**
 * @classdesc Implements the basic building structure of our admin application.
 */
export abstract class AdminApp {
    @ViewChild(AdminMainDirective, { read: ViewContainerRef })
    private appSelector: ViewContainerRef;
    @ViewChild(AdminMainDirective, { static: false }) private adminMain: AdminMainDirective;

    private appRef: ComponentRef<AdminAppComponent>;
    private appInstance: AdminAppComponent;

    private routePair: Map<string, Type<unknown>>;

    constructor(private resolver: ComponentFactoryResolver, private nbMenuService: NbMenuService, private router: Router) {}

    public addMenuItem(items: NbMenuItem[]) {
        this.nbMenuService.addItems(items, 'menu');
    }

    /**
     * "Instantiates" the admin panel with the routes provided with registerRoute method.
     */
    public build() {
        this.appRef = this.appSelector.createComponent(
            resolve<AdminAppComponent>(this.resolver, AdminAppComponent)
        );
        this.appInstance = this.appRef.instance;
        
        this.appInstance.menu = this.adminMain.menuItems;
        this.appInstance.fakeRouterInitialized$.subscribe((container) => {
            this.appInstance.fakeRouterContainer = <ViewContainerRef>container;
            this.appRef.changeDetectorRef.markForCheck();
            this.appInstance = this.appRef.instance;

            this.router.events.pipe(
                filter((evt) => {
                    console.log('evt', evt)
                    return evt instanceof NavigationStart;
                })
            ).subscribe((navigation: NavigationStart) => {
                console.log('route', JSON.stringify(navigation.url));
                this.goToRoute(navigation.url);
            })
        });

        this.appRef.changeDetectorRef.markForCheck();
    }

    public goToRoute<T>(route: string): void {
        if (this.appInstance.fakeRouterContainer) {
            this.appInstance.fakeRouterContainer.clear();
        }

        lazyComponent = this.routePair.get(route);

        this.appInstance.fakeRouterContainer.createComponent(
            resolve<T>(this.resolver, lazyComponent as Type<T>)
        );

        this.appRef.changeDetectorRef.markForCheck();
    }

    public registerRoute(route, component) {
        if (!this.routePair) {
            this.routePair = new Map<string, Type<unknown>>();
        }

        this.routePair.set(route, component);
    }
}