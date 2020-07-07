import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['admin-app.component.scss'],
  template: `
    <ngx-one-column-layout>
    <ng-container *ngIf="menu">
      <nb-menu [items]="menu"></nb-menu>
    </ng-container>
    <router-outlet></router-outlet>
    </ngx-one-column-layout>  `,
})
export class AdminAppComponent {
  @Input() public menu: import('@nebular/theme').NbMenuItem;
}
