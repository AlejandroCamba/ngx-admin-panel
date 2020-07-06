import {
  Directive,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({})
export abstract class IndependentComponent {
  abstract name: string;
  abstract value: unknown;

  containerRef: ElementRef;
  elRef: ElementRef;

  protected abstract childValueEmitter: (...args) => void;
  @Output() public abstract childValueChanged: EventEmitter<unknown>;

  style: any = { style: null };
  
  setStyle(style) {
    this.style = { ...this.style, ...style };
  }
}
