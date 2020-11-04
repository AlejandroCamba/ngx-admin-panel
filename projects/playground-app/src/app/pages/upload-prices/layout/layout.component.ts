import { Component, AfterViewInit } from '@angular/core';
import { BlockComponent } from '@ngx-admin-panel/core';

@Component({
  selector: 'upload-prices-table-layout',
  template: `
  <div block>
    <ng-content></ng-content>
  </div>`
})
export class UploadPricesTableLayout extends BlockComponent {

}
