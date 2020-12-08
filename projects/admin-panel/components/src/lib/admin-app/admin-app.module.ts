import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { LayoutService } from '../@theme/layouts/layout.service';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';
import { OneColumnLayoutComponent } from '../@theme/layouts/one-column/one-column.layout';

import { ThemeModule } from '../@theme/theme.module';

import {
  NbAlertModule,
  NbButtonModule,
    NbChatModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbDialogModule,
    NbInputModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import { CoreModule } from '../@core/core.module';
import { LazyLoaderService } from './services/lazy-load.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './components/pages.component';
import { HeaderComponent } from '../@theme/components/header/header.component';
import { NgxAdminAuthModule } from '../admin-auth/admin-auth.module';
import {LoginComponent} from '../admin-auth/login/login.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbAuthComponent, NbAuthModule } from '@nebular/auth';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject('env') private environemt) {

  }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //   const token = localStorage.getItem('auth_token');
      //   if (!token) {
      //       return next.handle(req);
      //   }

        let url = req;
        if(req.url.indexOf('{{base}}') !== -1 && req.url.indexOf('{{loginEndpoint}}') !== -1) {

            const body = {} 


            Object.keys(req.body).forEach((key) => {
              body[this.environemt.endpoints.login.body[key]] = req.body[key]
            })

            url = req.clone({
              url: req.url.replace('{{base}}', this.environemt.apiUrl).replace('{{loginEndpoint}}', this.environemt.endpoints.login.path),
              withCredentials: this.environemt.endpoints.withCredentials,
              body: body
          });
        }
        
        console.log('ENTROO!');

        if(req.url.indexOf('{{base}}') !== -1 && req.url.indexOf('{{logoutEndpoint}}') !== -1) {

          url = req.clone({
            url: req.url.replace('{{base}}', this.environemt.apiUrl).replace('{{logoutEndpoint}}', this.environemt.endpoints.logout.path)
        });
        console.log(url);

      }

        return next.handle(url);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        NbChatModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbMenuModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbToastrModule.forRoot(),
        NbWindowModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
      ],
    declarations: [
        AdminMainDirective,
        AdminAppComponent,
        PagesComponent,
        HeaderComponent,
        OneColumnLayoutComponent
    ],
    entryComponents: [AdminAppComponent, LoginComponent, NbAuthComponent],
    providers: [LayoutService, AdminMainDirective, LazyLoaderService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    exports: [AdminMainDirective],
})
export class AdminAppModule {
  public static forRoot(environment: any): ModuleWithProviders {

    return {
        ngModule: AdminAppModule,
        providers: [
            {
                provide: 'env', // you can also use InjectionToken
                useValue: environment
            }
        ]
    };
}
}
