import { Directive, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: 'bla'
})
export abstract class IndependentComponent {
    abstract name: string;
    abstract value: unknown;

    containerRef: ElementRef;
    elRef: ElementRef;

    protected abstract childValueEmitter: (...args) => void;
    @Output() public abstract childValueChanged: EventEmitter<unknown>;
}
