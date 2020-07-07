import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabsModule, TabsComponent, TabDirective } from '@admin-panel/components';
import { BlockModule, ARoleModule } from '@admin-panel/core';

import { HttpClientModule } from '@angular/common/http';

import { AdminAppModule } from '@admin-panel/components';

@NgModule({
    declarations: [AppComponent] /* PASA A UN MODULO el nextpagecomponent* */,
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BlockModule,
        TabsModule,
        BrowserModule,
        ARoleModule,
        AdminAppModule,
    ],
    entryComponents: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
