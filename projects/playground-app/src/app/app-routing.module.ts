import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ADMIN_ROUTES, PagesComponent } from '@ngx-admin-panel/components';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'pages/:section',
                component: PagesComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AdminAppRoutingModule {}
