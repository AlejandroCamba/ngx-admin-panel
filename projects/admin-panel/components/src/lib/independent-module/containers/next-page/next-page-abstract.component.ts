import { Output, EventEmitter, Directive } from '@angular/core';
import { BlockComponent } from '@admin-panel/core';

@Directive()
export abstract class NextPageAbstract extends BlockComponent{
  @Output() middlePagerEmitter = new EventEmitter();

  constructor() {
    super();
  }

  toggleLastScreen(evt) {
    this.middlePagerEmitter.emit(evt)  
  }
}