import { ViewChild, ViewContainerRef, ComponentFactoryResolver, Directive } from '@angular/core';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';

/**
 * @classdesc Implements the basic building structure of an admin application.
 */
@Directive()
export abstract class AdminApp {
    @ViewChild(AdminMainDirective, { read: ViewContainerRef })
    private appSelector: ViewContainerRef;

    @ViewChild(AdminMainDirective, { static: false })
    private appInstance: AdminMainDirective;

    private adminInstance: { menu: import('@nebular/theme').NbMenuItem };

    constructor(private resolver: ComponentFactoryResolver) {}

    /**
     * @Param routes {} the routes to be used to override the current routes at AdminAppModule
     */
    public appendRoutes(routes) {
        this.adminInstance.menu = routes;
    }

    public addRoutes() {}

    public addTabs() {}

    public addHeader() {}

    public addFooter() {}

    public build() {
        const app = this.appSelector.createComponent(
            this.resolver.resolveComponentFactory(AdminAppComponent)
        );
        
        app['menu'] = this.appInstance.menuItems;
    }
}
