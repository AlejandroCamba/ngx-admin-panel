import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChildren,
  QueryList,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core';
import { IndependentComponent } from '../components/parent/independent.component';

@Component({
  selector: 'filter-adapter',
  template: `
    <ng-content></ng-content>
  `
})
export class FilterAdapterComponent implements OnInit, AfterContentInit {

  @ContentChildren(IndependentComponent) childrenComponents: QueryList<IndependentComponent>;
  @Output() filterChanged = new EventEmitter<unknown>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.childrenComponents.forEach(component => {
      component.childValueChanged.subscribe((change) => {
        alert('catcheadoooo')
        this.filterChanged.emit(change)
      })
    })
  }

}
