/**
 * The main component that renders single TabComponent
 * instances.
 */
/// <reference types="../../types/tabs"/>

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  OnInit
} from '@angular/core';

import { TabDirective } from './tab.directive';
import { GRID_CONFIG } from './grid-config.const';

import { BlockComponent, Grid, PositionFactory } from '@admin-panel/core';

const BootstrapClass = {
  topLeft: '',
  verticalLeft: 'flex-column',
  topCenter: 'justify-content-center'
};

@Component({
  selector: 'ngx-admin-tab-menu',
  template: `
    <div block [config]="childPositionConfig">
      <div [ngStyle]="tabCssStyle.menuStyle">
        <ul class="nav" [ngClass]="tabsPosition">
          <li
            class="nav-item"
            *ngFor="let tab of tabs"
            (click)="selectTab(tab)"
            [class.active]="tab.active"
            [ngStyle]="
              tab.active
                ? mergeStyles(tabCssStyle.tabStyle, tabCssStyle.tabStyle.active)
                : tabCssStyle.tabStyle
            "
          >
            <a
              class="nav-link"
              href="#"
              [ngStyle]="{
                color: tab.active
                  ? tabCssStyle.tabStyle.active.color
                  : tabCssStyle.tabStyle.color
              }"
              >{{ tab.title }}</a
            >
          </li>
        </ul>
      </div>
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabsComponent extends BlockComponent
  implements AfterContentInit, OnInit {
  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;
  @Input() public tabStyle: ATabViewConfig;
  @Input() public tabCssStyle: ATabViewStyle;

  public childPositionConfig = PositionFactory(new Grid());
  public tabsPosition: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.childPositionConfig.contentPosition =
      GRID_CONFIG[this.tabStyle].contentPosition;
    this.tabsPosition = BootstrapClass[this.tabStyle];
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.isTabActive());

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: any) {
    this.tabs.toArray().forEach(tabDetail => tabDetail.setActive(false));
    tab.setActive(true);
  }

  setStyle(...[menuStyle, tabStyle]: Array<object>): object {
    return { menuStyle, tabStyle };
  }

  mergeStyles(style1, style2): object {
    return { ...style1, ...style2 };
  }
}
