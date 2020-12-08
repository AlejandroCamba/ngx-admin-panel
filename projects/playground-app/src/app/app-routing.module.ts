import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ADMIN_ROUTES, LoginComponent, PagesComponent } from '@ngx-admin-panel/components';
import { NgxAdminAuthModule } from './admin-auth/admin-auth.module';
import { NbAuthComponent } from '@nebular/auth';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'pages/:section',
                component: PagesComponent,
            },
            {
                path: 'auth/:section',
                component: PagesComponent
            }
        ]),
    ],
    exports: [RouterModule],
})
export class AdminAppRoutingModule {}
