import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { ApiService } from '../../../http/services/api.service';

@Component({
    selector: '',
    template: `
        <nb-select
            multiple
            placeholder="{{ cell.getColumn().id }}"
            [ngModel]="yourModelStore"
            (selectedChange)="onChange($event)"
        >
            <nb-option *ngFor="let item of myValues" [value]="item.id">{{ item.name }}</nb-option>
        </nb-select>
        <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    `,
})
export class MultiSelComponent extends DefaultEditor implements OnInit, AfterViewInit {
    public myValues = [];
    yourModelStore = [];
    public test;

    @ViewChild('htmlValue') htmlValue: ElementRef;

    @Input() cell: Cell;
    @Input() inputClass: string;

    constructor(private apiService: ApiService) {
        super();
    }

    ngOnInit() {
        this.apiService.get('plan').subscribe((plans) => {
            this.myValues = plans.map((plan) => {
                return { id: plan.id, name: plan.name };
            });
        });
    }

    ngAfterViewInit() {
        console.log('cell', this.cell.getColumn().id);
    }

    onChange(event) {
        this.cell.setValue(event);
    }
}
