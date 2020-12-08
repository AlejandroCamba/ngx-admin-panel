/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthResult, NbAuthService, NbLoginComponent } from '@nebular/auth';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent implements OnInit {
    @Input() public username = {
        labelName: 'Email address: ',
        controlName: 'email',
    };

    @Input() public password = {
        labelName: 'Password: ',
        controlName: 'password',
    };
    
    ngOnInit() {
      this.service.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.router.navigate(['pages/dashboard']); // Your redirection goes here
        }
      });
    }

}
