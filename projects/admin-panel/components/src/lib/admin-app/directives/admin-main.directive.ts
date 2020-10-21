import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngxAdminMain]'
})
export class AdminMainDirective {
  @Input() menuItems: import('@nebular/theme').NbMenuItem[];
}
