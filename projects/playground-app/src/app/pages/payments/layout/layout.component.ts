import { Component, AfterViewInit } from '@angular/core';
import { BlockComponent } from '@admin-panel/core';

@Component({
  selector: 'payments-table-layout',
  template: `
  <div block>
    <ng-content></ng-content>
  </div>`
})
export class PaymentTableLayout extends BlockComponent {

}
