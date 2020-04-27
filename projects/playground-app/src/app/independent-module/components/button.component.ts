import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { IndependentComponent } from './parent/independent.component';

@Component({
    selector: 'default-button',
    template: `
        <ng-container>
            <button type="type" class="btn btn-primary" (click)="handleClick()">
                {{ value }}
            </button>
        </ng-container>
    `,
    styles: [``],
    providers: [{ provide: IndependentComponent, useExisting: ButtonComponent }]
})
export class ButtonComponent extends IndependentComponent implements OnInit {
    @Input() type: string = '';
    @Output() childValueChanged = new EventEmitter();

    @Input() name = 'button';

    @Input() value = '';

    @Input() handleClick: () => void = () => {};

    constructor() {
        super();
    }

    childValueEmitter = () => {};

    ngOnInit() {}
}
