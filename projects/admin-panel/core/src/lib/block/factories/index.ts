import { SBlock, BlockValues } from './families/block';
import { SFlex, FlexValues } from './families/flex';
import { SFlexGrid, FlexGridValues } from './families/flex-grid';
import { SGrid, GridValues } from './families/grid';

export type ContentPosition<T extends PStructures> = Record<
    Extract<PStructures, T>,
    Extract<PStructures, T> extends SBlock
        ? BlockValues
        : Extract<PStructures, T> extends SFlex
        ? FlexValues
        : Extract<PStructures, T> extends SFlexGrid
        ? FlexGridValues
        : Extract<PStructures, T> extends SGrid
        ? GridValues
        : never
>;

/*

-------------- USER UTILS --------------

*/

export type PStructures = SBlock | SFlex | SFlexGrid | SGrid;
