import { SkipSelf, Directive, Self, Optional, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AState } from '../../services/a-state-service';

@Directive({})
export abstract class AAdminState<S = {}> {
    private myState$: Observable<S>;
    private myParentState$: Observable<any>;

    constructor(
        @SkipSelf() @Optional() private parentInstanceService: AState<unknown>,
        @Self() @Optional() private multipleInstaceService: AState<S>
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
