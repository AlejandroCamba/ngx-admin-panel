/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxAdminAuthRoutingModule } from './admin-auth-routing.module';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { LoginComponent } from './login/login.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAdminAuthRoutingModule,
        // NbAuthModule.forRoot({
        //   strategies: [
        //     NbPasswordAuthStrategy.setup({
        //       name: 'email',
        //       baseEndpoint: '{{base}}',
        //        login: {
        //          endpoint: '{{loginEndpoint}}',
        //        }
        //     }),
        //   ]
        // })
    ],
    declarations: [LoginComponent],

})
export class NgxAdminAuthModule {}
