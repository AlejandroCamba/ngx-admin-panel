import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabsModule, TabsComponent, TabDirective } from '@admin-panel/components';
import { BlockModule, ARoleModule } from '@admin-panel/core';

import {
    HttpClientModule,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { ModuleBModule } from './module-b/module-b.module';
import { AModule } from './module-a/module-a.module';
import { IndependentModule, TableModule, GraphModule, NextPageComponent } from  '@admin-panel/components';
import { Observable } from 'rxjs';
import { NextPageExample } from './zxcasca/next-page.component';
import { EditFormComponent } from './zxcasca/edit-form.component';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true,
        });

        return next.handle(request);
    }
}

@NgModule({
    declarations: [AppComponent, NextPageExample, EditFormComponent], /* PASA A UN MODULO el nextpagecomponent* */
    imports: [
        HttpClientModule,
        GraphModule,
        BrowserModule,
        AppRoutingModule,
        BlockModule,
        ModuleBModule,
        AModule,
        TabsModule,
        BrowserModule,
        ARoleModule,
        TableModule,
        IndependentModule,
    ],
    entryComponents: [NextPageExample],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
