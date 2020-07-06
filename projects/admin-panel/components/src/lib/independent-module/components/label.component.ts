import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'default-label',
    template: `
        <span #label class="align-middle" [ngStyle]="style">{{ value  }}</span>
    `,
    styles: [``]
})
export class LabelComponent implements OnInit {
  @Input() value: string;
  style: {} = {};

  setStyle(style) {
    this.style = style;
  }

  ngOnInit() {
  }
}
