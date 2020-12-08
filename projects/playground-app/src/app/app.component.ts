import { Component, AfterViewInit } from '@angular/core';
import { AdminApp, LoginComponent } from '@ngx-admin-panel/components';
import { NbMenuItem } from '@nebular/theme';
import { PagesComponent } from './pages/pages.component';
import { UsersTableComponent } from './pages/users/users.component';
import { SimpleTablesComponent } from './pages/simple-tables/simple-tables.component';
import { GameItemsComponent } from './pages/game-items/game-items.component';
import { UploadPricesComponent } from './pages/upload-prices/upload-prices.component';
import { UploadItemsComponent } from './pages/upload-items/upload-items.component';

// import { LoginComponent } from './admin-auth/login/login.component';

const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        link: 'pages/dashboard',
        icon: 'home-outline',
    },
    {
        title: 'Users',
        link: 'pages/users',
        icon: 'person-outline',
    },
    {
        title: 'Game Items',
        link: 'pages/game-items',
        icon: 'pricetags-outline',
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
    // {
    //     icon: 'shopping-cart-outline',
    //     title: 'Orders',
    //     link: 'pages/orders',
    // },
    // {
    //     icon: 'credit-card-outline',
    //     title: 'Payments',
    //     link: 'pages/payments',
    // }
];

@Component({
    selector: 'ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AdminApp implements AfterViewInit {
    public menu = MENU_ITEMS;

    ngAfterViewInit() {
        this.registerRoute('/pages/dashboard', { component: PagesComponent });
        this.registerRoute('/pages/game-items', { component: GameItemsComponent });
        this.registerRoute('/pages/users', { component: UsersTableComponent });
        this.registerRoute('/pages/simple-tables', { component: SimpleTablesComponent });
        this.registerRoute('/pages/upload-prices', { component: UploadPricesComponent });
        this.registerRoute('/pages/upload-items', { component: UploadItemsComponent });
        // this.registerRoute('/auth/login', {
        //     component: LoginComponent,
        //     loginRoute: true,
        //     instance: {
        //         username: {
        //             labelName: 'Username',
        //             controlName: 'username',
        //         },
        //         password: {
        //             labelName: 'Password',
        //             controlName: 'password',
        //         }
        //     }
        // });
        
        // this.registerRoute('/pages/orders', OrdersTableComponent);
        // this.registerRoute('/pages/payments', PaymentsTableComponent);
        // this.build({
        //     enableAuthentication: true,
        // });

        this.build();

        // this.addMenuItem([{
        //     title: 'page 2',
        //     link: 'pages/2',
        // },]);
    }
}
