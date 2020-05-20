import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { NextPageAbstract } from '@admin-panel/components';

@Component({
    selector: 'next-page-example',
    template: `
      <next-page (returnToMain)="toggleLastScreen($event)">
        <div>formulariu</div>
      </next-page>
    `,
    styles: [``],
})
export class NextPageExample extends NextPageAbstract implements OnInit {
  ngOnInit() {

  }
}
