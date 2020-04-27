import { Output, EventEmitter } from '@angular/core';
import { BlockComponent } from '@admin-panel/core';

export abstract class NextPageAbstract extends BlockComponent{
  @Output() middlePagerEmitter = new EventEmitter();

  constructor() {
    super();
  }

  toggleLastScreen(evt) {
    this.middlePagerEmitter.emit(evt)  
  }
}