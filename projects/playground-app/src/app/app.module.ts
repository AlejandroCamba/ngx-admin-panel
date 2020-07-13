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
@NgModule({
    declarations: [AppComponent] /* PASA A UN MODULO el nextpagecomponent* */,
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
        PagesModule
    ],
    entryComponents: [],
    providers: [LazyLoaderService],
    bootstrap: [AppComponent],
})
export class AppModule {}
