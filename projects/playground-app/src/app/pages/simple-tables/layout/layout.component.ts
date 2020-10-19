import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BlockComponent, PositionFactory, Grid, StructureType } from '@admin-panel/core';
import { GRID_CONFIG } from './grid-config.const';

@Component({
    selector: 'simple-table-layout',
    template: ` <div block [config]="childPositionConfig">
        <ng-content></ng-content>
    </div>`,
})
export class SimpleTablesLayout extends BlockComponent implements OnInit {
    public childPositionConfig = PositionFactory(
        new Grid(StructureType.grid, {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 6,
                        },
                        {
                            defaultSize: 6,
                        },
                        {
                            defaultSize: 6,
                        },
                        {
                            defaultSize: 6,
                        },
                        {
                            defaultSize: 12,
                        },
                    ],
                },
                height: 'match-parent',
            },
        })
    );

    constructor() {
        super();
    }

    ngOnInit() {}
}
