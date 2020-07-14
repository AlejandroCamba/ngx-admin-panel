import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, ChangeDetectionStrategy } from '@angular/core';
import { AdminApp, AdminMainDirective, LazyLoaderService } from '@admin-panel/components';
import { NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'ome',
        link: 'pages/a',
        icon: 'star'
    },
    {
        title: 'dashboard',
        link: 'pages/b',
    },
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends AdminApp implements AfterViewInit {
    public menu = MENU_ITEMS;

    ngAfterViewInit() {
        this.registerRoute('/pages/b', PagesComponent);
        this.registerRoute('/pages/a', DashboardComponent);
        this.build();

        this.addMenuItem([{
            title: 'page 2',
            link: 'pages/2',
        },]);
    }
}
