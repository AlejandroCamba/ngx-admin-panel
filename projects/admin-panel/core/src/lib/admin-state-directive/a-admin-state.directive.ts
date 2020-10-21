import { SkipSelf, Directive, Self, Optional, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgxAdminStateService } from '../state-service/a-state-service';

@Directive({})
export abstract class NgxAdminStateDirective<S = {}> {
    private myState$: Observable<S>;
    private myParentState$: Observable<any>;

    constructor(
        @SkipSelf() @Optional() protected parentInstanceService: NgxAdminStateService<unknown>,
        @Self() @Optional() protected multipleInstaceService: NgxAdminStateService<S>
    ) {
        this.myState$ = multipleInstaceService.getState() || of({} as S);
        this.myParentState$ = parentInstanceService ? parentInstanceService.getState() : of({});
    }

    getState(): Observable<unknown> {
        return this.myState$;
    }

    setState(state: object) {
        this.myParentState$.subscribe(parentState => {
            this.multipleInstaceService.setState({ ...parentState, ...state });
        });
    }
}
