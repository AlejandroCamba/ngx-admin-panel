import { Component, AfterViewInit } from '@angular/core';
import { BlockComponent } from '@ngx-admin-panel/core';

@Component({
  selector: 'ngx-game-items-table-layout',
  template: `
  <div block>
    <ng-content></ng-content>
  </div>`
})
export class GameItemsTableLayout extends BlockComponent {

}
