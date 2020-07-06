export const enum BlockContentPosition {
    left = 'justify-content-start',
    right = 'justify-content-end',
    center = 'justify-content-center',
    useRow = 'justify-content-between',
    useRowWithSpaceBetween = 'justify-content-around'
}

export const enum StructureType {
    grid = 'grid',
    flex = 'flex',
    flexGrid = 'flex-grid',
    block = 'block'
}

export interface PositionConfig {
    contentPosition:
        | 'justify-content-start'
        | 'justify-content-end'
        | 'justify-content-center'
        | 'justify-content-between'
        | 'justify-content-around';
}

// export type GridUtils = 'row' | 'col';
