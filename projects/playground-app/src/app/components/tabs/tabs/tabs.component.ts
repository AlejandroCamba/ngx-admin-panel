/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Input,
    OnInit,
    AfterViewInit
} from '@angular/core';

import { TabDirective } from './tab.directive';
import { BlockComponent, Grid, PositionFactory, Flex, FlexGrid } from '@admin-panel/core';

type ATabViewConfig = 'topLeft' | 'verticalLeft' | 'topCenter';

type MenuStyle = {
    backgroundColor: string;
    padding: string;
    margin: string;
};

type TabStyle = {
    width: string;
    height: string;
    backgroundColor: string;
    background: string;
    padding: string;
    margin: string;
    border: string;
    fontStyle: string;
    fontSize: string;
};

type ATabViewStyle = {
    tabStyle: Partial<TabStyle>;
    menuStyle: Partial<MenuStyle>;
};

const gridConfig: Record<ATabViewConfig, Partial<Grid>> = {
    verticalLeft: {
        contentPosition: {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 3,
                            offset: undefined
                        },
                        {
                            defaultSize: 9,
                            offset: undefined
                        }
                    ]
                }
            }
        }
    },
    topLeft: {
        contentPosition: {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 12,
                            offset: undefined
                        }
                    ]
                }
            }
        }
    },
    topCenter: {
        contentPosition: {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 12,
                            offset: undefined
                        },
                        {
                            defaultSize: 12,
                            offset: undefined
                        }
                    ]
                }
            }
        }
    }
};

const BootstrapClass = {
    topLeft: '',
    verticalLeft: 'flex-column',
    topCenter: 'justify-content-center'
};

@Component({
    selector: 'ATabMenu',
    template: `
        <div block [config]="childPositionConfig">
            <div [ngStyle]="tabCssStyle.menuStyle">
                <ul class="nav" [ngClass]="tabsPosition">
                    <li
                        class="nav-item"
                        *ngFor="let tab of tabs"
                        (click)="selectTab(tab)"
                        [class.active]="tab.active"
                        [ngStyle]="tabCssStyle.tabStyle"
                    >
                        <a class="nav-link" href="#">{{ tab.title }}</a>
                    </li>
                </ul>
            </div>
            <div>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class TabsComponent extends BlockComponent implements AfterContentInit, OnInit {
    @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

    @Input() public tabStyle: ATabViewConfig;

    @Input() public tabCssStyle: ATabViewStyle = {
        tabStyle: {
            backgroundColor: 'black',
            width: '100%',
            padding: '0',
            margin: '0'
        },
        menuStyle: {
            backgroundColor: 'yellow',
            padding: '0',
            margin: '0'
        }
    };

    public childPositionConfig = PositionFactory(new Grid());
    public tabsPosition: string;

    constructor() {
        super();
    }

    ngOnInit() {
        this.childPositionConfig.contentPosition = gridConfig[this.tabStyle].contentPosition;
        this.tabsPosition = BootstrapClass[this.tabStyle];
    }

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter(tab => tab.isTabActive());

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: any) {
        this.tabs.toArray().forEach(tab => tab.setActive(false));
        tab.setActive(true);
    }

    setStyle(...[menuStyle, tabStyle]: Array<object>): object {
        return { menuStyle, tabStyle };
    }
}
