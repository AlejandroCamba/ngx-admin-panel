import { Grid } from '@ngx-admin-panel/core';

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
                },
                height: 'match-parent'
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
                },
                height: 'match-parent'
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
                        }
                    ]
                },
                height: 'match-parent'
            }
        }
    }
};
