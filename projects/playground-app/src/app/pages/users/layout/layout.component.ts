import { Component, AfterViewInit } from '@angular/core';
import { BlockComponent } from '@admin-panel/core';

@Component({
  selector: 'ngx-smart-table-layout',
  template: `
  <div block>
    <ng-content></ng-content>
  </div>`
})
export class UsersTableLayout extends BlockComponent {

}
