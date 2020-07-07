import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[admin-main]'
})
export class AdminMainDirective {
  @Input() menuItems: import('@nebular/theme').NbMenuItem;
}