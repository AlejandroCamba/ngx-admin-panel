import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'pagination',
  template: `
    <nav aria-label="Page navigation example" *ngIf="pages">
      <ul class="pagination justify-content-end">
        <li
          class="page-item navigation-button"
          [class.disabled]="previousDisabled"
        >
          <a class="page-link" (click)="previous()" tabindex="-1">Previous</a>
        </li>
        <li
          class="page-item navigation-button bv"
          (click)="setCurrent(number)"
          *ngFor="let number of numbers"
        >
          <a
            class="page-link"
            [ngStyle]="{
              display:
                number >= limit.min && number <= limit.max ? 'block' : 'none',
                backgroundColor: number === current ? bgActiveColor : 'white'
            }"

            >{{ number }}</a
          >
        </li>
        <li class="page-item navigation-button" [class.disabled]="nextDisabled">
          <a class="page-link" (click)="next()">Next</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .navigation-button {
        cursor: pointer;
      }
    `
  ]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() bgActiveColor: string = '#007bff';
  /* Template usage only*/
  public limit = {
    max: 5,
    min: 1
  };
  /*****/

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
    if (sc.pages) {
      this.numbers = Array.from({ length: this.pages }).map((x, i) => i + 1);
    }
  }

  next() {
    if (!this.nextDisabled) {
      if (this.current === this.limit.max) {
        this.limit.max++;
        this.limit.min++;
      }

      this.filterChanged.emit({ name: 'pagination', value: ++this.current });
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
      if (this.current === this.limit.min) {
        this.limit.max--;
        this.limit.min--;
      }

      this.filterChanged.emit({ name: 'pagination', value: --this.current });
      // si es falso
      this.nextDisabled = false;

      if (this.current === 1) {
        //si es uno
        this.previousDisabled = true;
      }
    }
  }

  setCurrent(number: number) {
    if (number !== this.current) {
      this.current = number;
      this.filterChanged.emit({ name: 'pagination', value: this.current });
    }

    if (this.current === this.pages) {
      this.nextDisabled = true;
    } else if (this.current === 1) {
      this.previousDisabled = true;
    }
  }

  setId(number: number): string {
    if (number === this.current) {
      return 'selected';
    }

    return undefined;
  }
}
