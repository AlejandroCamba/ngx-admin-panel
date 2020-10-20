import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';

import { TabsModule, TableModule } from '@admin-panel/components';
import { BlockModule } from '@admin-panel/core';

import { HttpClientModule } from '@angular/common/http';

import { AdminAppModule, LazyLoaderService } from '@admin-panel/components';
import { RouterModule, Router } from '@angular/router';
import { AdminAppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersTableLayout } from './pages/users/layout/layout.component';
import {
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
} from '@nebular/theme';
import { UsersTableComponent } from './pages/users/users.component';
import { ConsoleComponent } from './pages/simple-tables/console/console.component';
import { GameComponent } from './pages/simple-tables/game/game.component';
import { ServerComponent } from './pages/simple-tables/server/server.component';
import { SimpleTablesLayout } from './pages/simple-tables/layout/layout.component';
import { SimpleTablesComponent } from './pages/simple-tables/simple-tables.component';
import { HttpModule } from './http/http.module';
import { ConsoleServerGameComponent } from './pages/simple-tables/console-server-game/console-server-game.component';
import { PlanComponent } from './pages/simple-tables/plan/plan.component';
import { MultiSelComponent } from './pages/simple-tables/game/multisel.component';
import { FormsModule } from '@angular/forms';
import { GameItemsComponent } from './pages/game-items/game-items.component';
import { GameItemsTableLayout } from './pages/game-items/layout/layout.component';
import { UploadItemsTableLayout } from './pages/upload-items/layout/layout.component';
import { UploadItemsComponent } from './pages/upload-items/upload-items.component';
import { UploadPricesComponent } from './pages/upload-prices/upload-prices.component';
import { OrdersTableComponent } from './pages/orders/orders.component';
import { UploadPricesTableLayout } from './pages/upload-prices/layout/layout.component';
import { OrdersTableLayout } from './pages/orders/layout/layout.component';
import { PaymentsTableComponent } from './pages/payments/payments.component';
import { PaymentTableLayout } from './pages/payments/layout/layout.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersTableComponent,
        UsersTableLayout,
        SimpleTablesComponent,
        ConsoleComponent,
        GameComponent,
        ServerComponent,
        ConsoleServerGameComponent,
        PlanComponent,
        MultiSelComponent,
        GameItemsComponent,
        GameItemsTableLayout,
        SimpleTablesLayout,
        UploadItemsTableLayout,
        UploadPricesTableLayout,
        UploadPricesComponent,
        UploadItemsComponent,
        OrdersTableComponent,
        PaymentsTableComponent,
        PaymentTableLayout,
        OrdersTableLayout,
    ] /* PASA A UN MODULO el nextpagecomponent* */,
    imports: [
        AdminAppRoutingModule,
        RouterModule,
        HttpClientModule,
        BrowserModule,
        BlockModule,
        TabsModule,
        BrowserModule,
        AdminAppModule,
        PagesModule,
        Ng2SmartTableModule, // NECESARIO PARA SMART TABLES
        NbCardModule, // NECESARIO PARA SMART TABLES
        NbTreeGridModule, // NECESARIO PARA SMART TABLES
        NbIconModule, // NECESARIO PARA SMART TABLES,
        NbSelectModule,
        NbButtonModule,
        NbInputModule,
        NbAlertModule,
        TabsModule,
        TableModule,
        HttpModule,
        FormsModule,
    ],
    entryComponents: [
        UsersTableComponent,
        GameItemsComponent,
        UploadPricesComponent,
        UploadItemsComponent,
        SimpleTablesComponent,
        OrdersTableComponent,
        PaymentsTableComponent,
        MultiSelComponent,
    ],
    providers: [LazyLoaderService],
    bootstrap: [AppComponent],
})
export class AppModule {}
