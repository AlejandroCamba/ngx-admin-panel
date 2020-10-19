import {
    Component,
    Optional,
    ViewChild,
    ViewContainerRef,
    AfterViewInit,
} from '@angular/core';
import { Router, NavigationStart, RouterLinkActive, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AdminAppComponent } from '../admin-app.component';

@Component({
    template: ` <ng-container #dynamic_outlet></ng-container> `,
})
export class PagesComponent implements AfterViewInit {
    @ViewChild('dynamic_outlet', { read: ViewContainerRef }) public tabContent: ViewContainerRef;

    constructor(
        @Optional() private adminApp: AdminAppComponent,
        private router: Router
    ) {}

    ngAfterViewInit() {
      this.adminApp.dispatchTest(this.tabContent);
    }
}
