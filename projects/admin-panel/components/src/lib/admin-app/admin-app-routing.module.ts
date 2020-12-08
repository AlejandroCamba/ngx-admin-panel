import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAppComponent } from './admin-app.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    // {
    //     path: 'admin',
    //     component: AdminAppComponent,
    //     // children: [
    //     //     {
    //     //         path: 'pages/:tab', //:type is dynamic here
    //     //     },
    //     // ],
    // },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('@ngx-admin-panel/components').then((m) => m.NgxAdminAuthModule),
    // },
];
