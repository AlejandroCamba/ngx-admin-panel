import { Component, OnInit } from '@angular/core';
import { AState, AAdminState } from '@admin-panel/core';

@Component({
    selector: 'app-modulea',
    templateUrl: './modulea.component.html',
    styleUrls: ['./modulea.component.sass'],
    providers: [AState]
})
export class ModuleaComponent extends AAdminState implements OnInit {
    ngOnInit(): void {
        this.setState({ fromModuleAComponent: 'works!' });

        this.getState().subscribe(mergedState => {
            console.log('merged state from ModuleBComponent!', mergedState);
        });
    }
}
