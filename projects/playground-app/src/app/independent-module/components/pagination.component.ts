import {
    Component,
    OnInit,
    Input,
    ElementRef,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'pagination',
    template: `
        <nav aria-label="Page navigation example" *ngIf="pages">
            <ul class="pagination justify-content-end">
                <li class="page-item" [class.disabled]="previousDisabled">
                    <a class="page-link" (click)="previous()" tabindex="-1">Previous</a>
                </li>
                <li
                    class="page-item"
                    [class.active]="number === current"
                    (click)="setCurrent(number)"
                    *ngFor="let number of numbers"
                >
                    <a class="page-link">{{ number }}</a>
                </li>
                <li class="page-item" [class.disabled]="nextDisabled">
                    <a class="page-link" (click)="next()">Next</a>
                </li>
            </ul>
        </nav>
    `,
    styles: [``]
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input() pages: number;
    @Output() filterChanged = new EventEmitter();

    public current: number;
    public numbers = [];

    public previousDisabled = true;
    public nextDisabled: boolean;

    constructor() {
        this.current = 1;
    }

    ngOnInit() {
        this.numbers = Array.from({ length: this.pages }).map((x, i) => i + 1);
    }

    ngOnChanges(sc: SimpleChanges) {
        if(sc.pages) {
            this.numbers = Array.from({ length: this.pages }).map((x, i) => i + 1);
        }
    }

    next() {
        if (!this.nextDisabled) {
            this.filterChanged.emit({name: 'pagination', value: ++this.current})
            // si es falso
            this.previousDisabled = false;

            if (this.current === this.pages) {
                //si es max
                this.nextDisabled = true;
            }
        }
    }

    previous() {
        if (!this.previousDisabled) {
            this.filterChanged.emit({name: 'pagination', value: --this.current})
            // si es falso
            this.nextDisabled = false;

            if (this.current === 1) {
                //si es uno
                this.previousDisabled = true;
            }
        }
    }

    setCurrent(number: number) {
        this.current = number;

        if (number !== this.current) {
            this.filterChanged.emit({name: 'pagination', value: this.current})
        }

        if (this.current === this.pages) {
            this.nextDisabled = true;
        } else if (this.current === 1) {
            this.previousDisabled = true;
        }
    }
}
