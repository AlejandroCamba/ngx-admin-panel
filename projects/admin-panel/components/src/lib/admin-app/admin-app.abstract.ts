import { ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';

/**
 * @classdesc Implements the basic building structure of an admin application.
 */
export abstract class AdminApp {
    @ViewChild(AdminMainDirective, { read: ViewContainerRef })
    private appSelector: ViewContainerRef;
    private adminInstance: { menu: import('@nebular/theme').NbMenuItem };

    constructor(private resolver: ComponentFactoryResolver) {}

    /**
     * @Param routes {} the routes to be used to override the current routes at AdminAppModule
     */
    appendRoutes(routes) {
        this.adminInstance.menu = routes;
    }

    addRoutes() {}

    addTabs() {}

    addHeader() {}

    addFooter() {}

    build() {
        const app = this.appSelector.createComponent(this.resolver.resolveComponentFactory(AdminAppComponent));
        app['menu'] = this.adminInstance.menu;
      }
}
