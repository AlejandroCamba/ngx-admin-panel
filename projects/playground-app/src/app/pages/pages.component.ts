import { Component, Optional } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AdminAppComponent } from '@admin-panel/components';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <div>aaaaa</div>
  `,
})
export class PagesComponent {
  constructor(@Optional() private aac: AdminAppComponent) {
    console.log('aac', this.aac)

  }
  menu = MENU_ITEMS;
}
