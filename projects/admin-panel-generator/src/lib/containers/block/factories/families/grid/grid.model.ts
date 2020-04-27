import { BlockPosition } from '../../position.factory';
import { StructureType } from '../../../models/models';
import { ContentPosition } from '../../';

export class Grid implements BlockPosition<Grid, StructureType.grid> {
    constructor(
        public structure: StructureType.grid = StructureType.grid,
        public contentPosition: ContentPosition<StructureType.grid> = {
            grid: {
                gridConfig: {
                    rowConfig: []
                }
            }
        }
    ) {}
}
