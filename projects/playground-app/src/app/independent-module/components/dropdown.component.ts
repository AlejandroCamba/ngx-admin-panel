import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { IndependentComponent } from './parent/independent.component';
import { FormGroup } from '@angular/forms';
import { FormAdapterComponent } from '../adapters/form-adapter.component';

@Component({
    selector: 'default-dropdown',
    template: `
        <ng-container [formGroup]="formGroup" *ngIf="formGroup; else defaultdropdown">
            <select
                class="custom-select"
                id="inlineFormCustomSelectPref"
                formControlName="{{ name }}"
            >
                <option selected value="">Choose...</option>
                <option *ngFor="let option of value">{{ option }}</option>
            </select>
        </ng-container>
        <ng-template #defaultdropdown>
            <select
                class="custom-select my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                [ngModel]="selectedValue"
                (ngModelChange)="childValueEmitter($event)"
            >
                <option selected disabled value="">Choose...</option>
                <option *ngFor="let option of value">{{ option }}</option>
            </select>
        </ng-template>
    `,
    providers: [{ provide: IndependentComponent, useExisting: DropdownComponent }],
    styles: [``]
})
export class DropdownComponent extends IndependentComponent  {
    @Input() value: string[];
    @Output() childValueChanged = new EventEmitter();

    public formGroup: FormGroup;
    public name: string;
    public selectedValue;
    public dirty: boolean;
    constructor(@Optional() private _fa: FormAdapterComponent) {
        super();

        if (_fa) {
            this.formGroup = this._fa._af.formGroup;
        }
    }

    childValueEmitter = event => {
      this.dirty = true;
      this.selectedValue = event;
        this.childValueChanged.emit({
            name: this.name,
            value: this.selectedValue
        });
    };
}
