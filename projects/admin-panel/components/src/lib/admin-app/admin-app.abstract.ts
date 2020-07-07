import { ViewChild, ViewContainerRef, ComponentFactoryResolver, Directive, ComponentRef } from '@angular/core';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';

/**
 * @classdesc Implements the basic building structure of an admin application.
 */
export abstract class AdminApp {
    @ViewChild(AdminMainDirective, { read: ViewContainerRef })
    private appSelector: ViewContainerRef;
    private appInstace: ComponentRef<AdminAppComponent>;

    constructor(private resolver: ComponentFactoryResolver, private adminMain: AdminMainDirective) {}

    /**
     * @Param routes {} the routes to be used to override the current routes at AdminAppModule
     */
    public appendRoutes(routes) {
    }

    public addRoutes() {}

    public addTabs() {}

    public addHeader() {}

    public addFooter() {}

    public build() {
        this.appInstace = this.appSelector.createComponent(
            this.resolver.resolveComponentFactory(AdminAppComponent)
        );
        
        this.appInstace['menu'] = this.adminMain.menuItems;
    }
}