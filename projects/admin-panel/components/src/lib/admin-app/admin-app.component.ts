import {
    Component,
    Input,
    ViewChild,
    ViewContainerRef,
    AfterViewInit,
    SimpleChanges,
    OnChanges,
    ChangeDetectorRef,
    Type,
    ComponentFactoryResolver,
    Inject,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { NbMenuService } from '@nebular/theme';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LazyComponent } from '.';
import { resolve } from './services/factory-resolver.utils';

const enum CONTAINER_TYPE {
    APP,
    AUTH,
}

@Component({
    selector: 'ngx-pages',
    styleUrls: ['admin-app.component.scss'],
    template: `
        <ngx-one-column-layout [onlyOutlet]="!menuEnabled">
            <nb-menu tag="menu" [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class AdminAppComponent implements AfterViewInit {
    @Input() public menu?: import('@nebular/theme').NbMenuItem[];
    @Input() public fakeRouterContainer: ViewContainerRef;
    @Input() public menuEnabled = true;
    @Input() public enableAuthentication = true;

    public fakeRouterInitialized$? = new Subject();

    fictionalRouterOutlet = (container: ViewContainerRef) => {
        this.fakeRouterContainer = container;
        this.fakeRouterInitialized$.next(container);
    };

    constructor(
        private resolver: ComponentFactoryResolver,
        private menuService: NbMenuService,
        private authService: NbAuthService
    ) {}

    ngAfterViewInit() {
        this.menuService.onItemClick().subscribe((event) => {
            if (event.item.title === 'Log out') {
                this.authService.logout('email').pipe().subscribe();
            }
        });
    }

    public createComponent<T>(lazyComponent: LazyComponent<T>) {
        if (this.fakeRouterContainer) {
            this.fakeRouterContainer.clear();
        }

        const instance = this.fakeRouterContainer.createComponent(
            resolve<T>(this.resolver, lazyComponent.component)
        ).instance;

        if (lazyComponent.instance) {
            if (Object.keys(lazyComponent.instance).length > 0) {
                Object.keys(lazyComponent.instance).forEach(
                    (key) => (instance[key] = lazyComponent.instance[key])
                );
            }
        }
    }
}
