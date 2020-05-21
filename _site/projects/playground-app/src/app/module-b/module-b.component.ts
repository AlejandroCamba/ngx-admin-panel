import { Component, OnInit } from '@angular/core';
import { AState, AAdminState } from '@admin-panel/core';

@Component({
    selector: 'app-module-b',
    templateUrl: './module-b.component.html',
    styleUrls: ['./module-b.component.sass'],
    providers: [AState]
})
export class ModuleBComponent extends AAdminState implements OnInit {
    ngOnInit(): void {
        this.setState({ fromModuleBComponent: 'works!' });

        this.getState().subscribe(mergedState => {
            console.log('merged state from ModuleBComponent!', mergedState);
        });
    }
}
