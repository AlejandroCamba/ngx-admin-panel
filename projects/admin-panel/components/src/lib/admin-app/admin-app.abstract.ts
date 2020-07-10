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
import { Router } from '@angular/router';
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

    public build() {
        this.appRef = this.appSelector.createComponent(
            resolve<AdminAppComponent>(this.resolver, AdminAppComponent)
        );

        this.appInstance = this.appRef.instance;

        this.appInstance.menu = this.adminMain.menuItems;
        this.appRef.changeDetectorRef.markForCheck();

        this.appInstance.fakeRouterInitialized$.subscribe((container) => {
            console.log('CONTAINERRR', container);
            this.appInstance.fakeRouterContainer = <ViewContainerRef>container;
            this.appRef.changeDetectorRef.markForCheck();
            this.appInstance = this.appRef.instance;
            this.router.events.subscribe((route) => {
                console.log(this.appInstance);
                console.log('rooooute', route);
                this.goToRoute('pages/a');
            })
        });
    }

    public goToRoute<T>(route: string): void {
        console.log('ins', this.appInstance);
        if (this.appInstance.fakeRouterContainer) {
            this.appInstance.fakeRouterContainer.clear();
        }

        this.appInstance.fakeRouterContainer.createComponent(
            resolve<T>(this.resolver, this.routePair.get(route) as Type<T>)
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
