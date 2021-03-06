/*******
 *
 *    GRID
 *
 * ******/
export type SGrid = import('../../../models/models').StructureType.grid;

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Col = HideCol | ResizeCol;

interface HideCol {
    hide: boolean;
}

interface ResizeCol {
    resizeTo: ColSize;
}

interface RowConfig {
    defaultSize: ColSize;
    xs?: Col;
    sm?: Col;
    md?: Col;
    lg?: Col;
    xl?: Col;
    offset?: {
        xs?: ColSize;
        sm?: ColSize;
        md?: ColSize;
        lg?: ColSize;
        xl?: ColSize;
    };
    align?: ColAlign;
}

interface GridShortcut {
    shortcut?: 'replay-last-col' | 'replay-first-col' | 'fill-with-auto';
}

interface Justify {
    justify?: import('../flex/index').FlexValues;
}

interface RowAlign {
    align: 'align-items-start' | 'align-items-center' | 'align-items-end';
}

type ColAlign = 'align-self-start' | 'align-self-center' | 'align-self-end';

export type GridValues = Record<
    'gridConfig',
    Justify & GridShortcut & Partial<RowAlign> & { rowConfig: Array<RowConfig> }
> & { height: 'match-parent' | 'wrap-content' };
// ** Important ** defines values for grid content
