import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';

import { TabsModule, TabsComponent, TabDirective } from '@admin-panel/components';
import { BlockModule, ARoleModule } from '@admin-panel/core';

import { HttpClientModule } from '@angular/common/http';

import { AdminAppModule, LazyLoaderService } from '@admin-panel/components';
import { RouterModule, Router } from '@angular/router';
import {AdminAppRoutingModule} from './app-routing.module';
import { PagesModule } from './pages/pages.module'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableComponent } from './pages/smart-table/smart-table.component';
import { NbCardModule, NbTreeGridModule, NbIconModule } from '@nebular/theme';

@NgModule({
    declarations: [AppComponent, SmartTableComponent] /* PASA A UN MODULO el nextpagecomponent* */,
    imports: [
        AdminAppRoutingModule,
        RouterModule,
        HttpClientModule,
        BrowserModule,
        BlockModule,
        TabsModule,
        BrowserModule,
        ARoleModule,
        AdminAppModule, 
        PagesModule,
        Ng2SmartTableModule, // NECESARIO PARA SMART TABLES
        NbCardModule,// NECESARIO PARA SMART TABLES
        NbTreeGridModule,// NECESARIO PARA SMART TABLES
        NbIconModule,// NECESARIO PARA SMART TABLES
    ],
    entryComponents: [SmartTableComponent],
    providers: [LazyLoaderService],
    bootstrap: [AppComponent],
})
export class AppModule {}
