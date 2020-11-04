import { Component, AfterViewInit } from '@angular/core';
import { BlockComponent } from '@ngx-admin-panel/core';

@Component({
  selector: 'ngx-orders-table-layout',
  template: `
  <div block>
    <ng-content></ng-content>
  </div>`
})
export class OrdersTableLayout extends BlockComponent {

}
