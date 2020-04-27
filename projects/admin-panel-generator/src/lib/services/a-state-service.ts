import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const initialState = {};

@Injectable()
export class AState<S> {
    private state = initialState;
    private behaviourSubject$ = new BehaviorSubject<S>(this.state as S);

    constructor() {}

    public getState(): Observable<S> {
        return this.behaviourSubject$.asObservable();
    }

    public setState(nextState: {}) {
        this.state = { ...this.state, ...nextState };
        this.behaviourSubject$.next(this.state as S);
    }
}
