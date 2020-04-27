import { Component, OnInit, Input, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormAdapterComponent } from '../adapters/form-adapter.component';

@Component({
    selector: 'admin-form',
    template: `
    <ng-container>
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            <ng-content></ng-content>
        </form>
    </ng-container>
    `,
    styles: [``]
})
export class AdminFormComponent implements AfterContentInit {
    public formGroup: FormGroup = new FormGroup({});
    public submitted: boolean = false;

    @Output() submitFormValue = new EventEmitter()

    constructor(private fb: FormBuilder) {
    }

    ngAfterContentInit() {
        console.log('controles desde content init', this.formGroup.controls)
    }

    onSubmit() {
        this.submitted = true;
        if (this.formGroup.invalid) {
            return null;
        } else {
            this.submitFormValue.emit(this.formGroup.value)
        }
    }
}
