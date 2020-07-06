import {
    Component,
    Input,
    TemplateRef,
    Optional,
    ContentChild,
    ElementRef,
    AfterViewInit,
    AfterContentInit,
    OnInit
} from '@angular/core';
import { AdminFormComponent } from '../containers/admin-form.component';
import {
    FormControl,
    FormGroup,
    Validator,
    Validators,
    ValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { ButtonComponent } from '../components/button.component';
import { IndependentComponent } from '../components/parent/independent.component';
import { CustomValidators } from 'ngx-custom-validators';

export type ValidatorName =
    | 'arrayLength'
    | 'base64'
    | 'creditCard'
    | 'date'
    | 'dateISO'
    | 'digits'
    | 'email'
    | 'equal'
    | 'notEqual'
    | 'equalTo'
    | 'notEqualTo'
    | 'gt'
    | 'gte'
    | 'json'
    | 'lt'
    | 'lte'
    | 'max'
    | 'maxDate'
    | 'min'
    | 'minDate'
    | 'number'
    | 'Property'
    | 'range'
    | 'rangeLength'
    | 'url'
    | 'uuid'
    | 'required';

export function ValidatorRecipe(msg: string, ...args) {
    return [msg, args];
}

export type ValidationOptions = Record<
    string,
    Partial<Record<ValidatorName, ReturnType<typeof ValidatorRecipe>>>
>;

export function ValidatorCreator(vName: string, ...args) {
    if (vName === 'required') return Validators.required;

    if(args[0].length > 1) {
      return CustomValidators[vName](...args);
    } else if(args[0].length === 1) {
      return CustomValidators[vName](args[0][0]);
    }

    return CustomValidators[vName];

}

@Component({
    selector: 'form-adapter',
    template: `
        <ng-container>
            <div class="form-group">
                <label *ngIf="name !== ''">{{ name }}</label>
                <div [ngClass]="{'rounded border border-danger': myFieldControl.dirty && myFieldControl.errors && _af.submitted}">
                  <ng-content></ng-content>
                </div>
                <div class="text-danger" *ngIf="myFieldControl.dirty && myFieldControl.errors && _af.submitted">
                    <label *ngFor="let err of myFieldControl.errors | keyvalue">{{
                        getValidationError(err.key)
                    }}</label>
                </div>
            </div>
        </ng-container>
    `
})
export class FormAdapterComponent implements OnInit, AfterContentInit {
    @Input() name: string;
    @Input() validators: ValidationOptions;

    @ContentChild(IndependentComponent) component: IndependentComponent;

    getValidationError = (incomingError): string => {
        return this.validators[incomingError][0];
    };

    public myFieldControl: FormControl;

    constructor(public _af: AdminFormComponent) {
        if (!_af) throw new Error('Form adapter must be inside <admin-form> tag.');
    }

    ngOnInit() {
        if (!this.name) throw new Error('Field must have a name.');
    }

    ngAfterContentInit() {
        this.component.name = this.name;
        let validators = [];

        Object.keys(this.validators).some(element => {
            validators = [...validators,
                ...[ValidatorCreator(
                    element,
                    this.validators[element][1]
                        ? this.validators[element][1]
                        : this.validators[element]
                )]
                ];
        });

        this.myFieldControl = new FormControl(this.component.value, validators);
        this._af.formGroup.addControl(this.name, this.myFieldControl);
    }
}
