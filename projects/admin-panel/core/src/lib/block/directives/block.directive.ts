import { Directive, ElementRef, Input } from '@angular/core';
import { PositionConfig, StructureType } from '../models/models';
import { Grid } from '../factories/families/grid/grid.model';
import { Flex } from '../factories/families/flex/flex.model';
import { FlexGrid } from '../factories/families/flex-grid/flex-grid.model';
import { Block } from '../factories/families/block/block.model';
import { PositionFactory } from '../factories/position.factory';

@Directive({
    selector: '[ngxAdminBlock]'
})
export class BlockDirective {
    @Input() config: Grid | Flex | FlexGrid | Block = PositionFactory(new Grid());

    constructor(private blockRef: ElementRef<HTMLElement>) {
        console.log('from BlockDirective', this.blockRef);
    }

    get elementRef(): ElementRef<HTMLElement> {
        return this.blockRef;
    }
}
