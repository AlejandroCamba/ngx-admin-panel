import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, ChangeDetectionStrategy } from '@angular/core';
import { AdminApp, AdminMainDirective, LazyLoaderService } from '@admin-panel/components';
import { NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {UsersTableComponent} from './pages/users/users.component';
import { BlockComponent } from 'dist/admin-panel/core/public-api';
import { SimpleTablesComponent } from './pages/simple-tables/simple-tables.component';
import { GameItemsComponent } from './pages/game-items/game-items.component';
import { UploadPricesComponent } from './pages/upload-prices/upload-prices.component';
import { UploadItemsComponent } from './pages/upload-items/upload-items.component';
import { OrdersTableComponent } from './pages/orders/orders.component';
import { PaymentsTableComponent } from './pages/payments/payments.component';

const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        link: 'pages/dashboard',
        icon: 'home-outline'
    },
    {
        title: 'Users',
        link: 'pages/users',
        icon: 'person-outline'
    },
    {
        title: 'Game Items',
        link: 'pages/game-items',
        icon: 'pricetags-outline'
    },
    {
        icon: 'layout-outline',
        title: 'Simple Tables',
        link: 'pages/simple-tables',
    },
    {
        icon: 'activity-outline',
        title: 'Upload Prices',
        link: 'pages/upload-prices',
    },
    {
        icon: 'checkmark-square-2-outline',
        title: 'Upload Items',
        link: 'pages/upload-items',
    },
    {
        icon: 'shopping-cart-outline',
        title: 'Orders',
        link: 'pages/orders',
    },
    {
        icon: 'credit-card-outline',
        title: 'Payments',
        link: 'pages/payments',
    }
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
        this.registerRoute('/pages/dashboard', PagesComponent);
        this.registerRoute('/pages/game-items', GameItemsComponent);
        this.registerRoute('/pages/users', UsersTableComponent);
        this.registerRoute('/pages/simple-tables', SimpleTablesComponent);
        this.registerRoute('/pages/upload-prices', UploadPricesComponent);
        this.registerRoute('/pages/upload-items', UploadItemsComponent);
        this.registerRoute('/pages/orders', OrdersTableComponent);
        this.registerRoute('/pages/payments', PaymentsTableComponent);
        this.build();

        // this.addMenuItem([{
        //     title: 'page 2',
        //     link: 'pages/2',
        // },]);
    }
}
