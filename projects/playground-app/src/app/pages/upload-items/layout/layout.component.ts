import { Component, AfterViewInit } from '@angular/core';
import { BlockComponent } from '@ngx-admin-panel/core';

@Component({
  selector: 'upload-items-table-layout',
  template: `
  <div block>
    <ng-content></ng-content>
  </div>`
})
export class UploadItemsTableLayout extends BlockComponent {

}
