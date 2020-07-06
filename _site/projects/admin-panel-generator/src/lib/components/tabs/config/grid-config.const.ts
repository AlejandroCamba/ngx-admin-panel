import { Grid } from '../../../containers/block/factories/families/grid/grid.model';

export const GRID_CONFIG: Record<ATabViewConfig, Partial<Grid>> = {
    verticalLeft: {
        contentPosition: {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 3
                        },
                        {
                            defaultSize: 9
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
                            defaultSize: 12
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
                            defaultSize: 12
                        },
                        {
                            defaultSize: 12
                        }
                    ]
                }
            }
        }
    }
};
