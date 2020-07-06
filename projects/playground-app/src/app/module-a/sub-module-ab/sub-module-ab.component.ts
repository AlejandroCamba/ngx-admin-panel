import { Component, OnInit } from '@angular/core';
import { AState, AAdminState } from '@admin-panel/core';

@Component({
    selector: 'app-sub-module-ab',
    templateUrl: './sub-module-ab.component.html',
    styleUrls: ['./sub-module-ab.component.sass'],
    providers: [AState]
})
export class SubModuleAbComponent extends AAdminState implements OnInit {
    ngOnInit(): void {
        this.setState({
            fromAppComponent: 'editado en SubModuleAbComponent',
            fromSubModuleAbComponent: 'works!'
        });

        this.getState().subscribe(mergedState => {
            console.log('merged state from SubModuleAbComponent!', mergedState);
        });
    }
}
