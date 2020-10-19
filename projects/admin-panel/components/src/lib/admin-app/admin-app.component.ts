import {
    Component,
    Input,
    ViewChild,
    ViewContainerRef,
    AfterViewInit,
    SimpleChanges,
    OnChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['admin-app.component.scss'],
    template: `
        <ngx-one-column-layout>
            <nb-menu tag="menu" [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class AdminAppComponent {
    @Input() public menu?: import('@nebular/theme').NbMenuItem[];
    @Input() public fakeRouterContainer: ViewContainerRef;
    public fakeRouterInitialized$? = new Subject(); 

    dispatchTest = (container: ViewContainerRef) => {
      this.fakeRouterContainer = container;
      this.fakeRouterInitialized$.next(container);
    }

    constructor() {}
}
