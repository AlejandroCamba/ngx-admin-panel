import { Component, OnInit, Input, EventEmitter, Inject, forwardRef, Host, ElementRef, Renderer2, Optional, AfterViewInit, Output, OnDestroy, ComponentRef } from '@angular/core';
import { IndependentComponent } from './parent/independent.component';
import { FormAdapterComponent } from '../adapters/form-adapter.component';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'default-input',
    template: `
      <ng-container [formGroup]="formGroup" *ngIf="formGroup; else defaultinput">
        <input class="form-control" type="text" formControlName="{{name}}">    
      </ng-container>
      <ng-template #defaultinput>
        <input [(ngModel)]="value" placeholder="{{placeholder}}" (ngModelChange)="childValueEmitter()" (blur)="handleBlur()" >    
      </ng-template>
    `,
    styles: [``],
    providers: [{ provide: IndependentComponent, useExisting: InputComponent }]
})
export class InputComponent extends IndependentComponent implements AfterViewInit {
  @Input() public name;
  @Input() public placeholder = '';
  @Input() value = '';

    @Output() childValueChanged = new EventEmitter();
    public formGroup: FormGroup;
    @Input() onBlurCallback: () => {};
    private myOwnReference: ComponentRef<InputComponent>;
    public dirty: boolean;

    constructor(@Optional() private _fa: FormAdapterComponent) {
        super();

        if (_fa) {
          this.formGroup = this._fa._af.formGroup;
        }
      }
      
      childValueEmitter = () => {
        this.dirty = true;
        this.childValueChanged.emit({name: this.name, value: this.value});
      }

    ngAfterViewInit() {
      
    }

    handleBlur() {
      if (this.onBlurCallback) {
        this.onBlurCallback();
        this.myOwnReference.destroy();
      }
    } 
}
