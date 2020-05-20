import { BlockPosition } from '../../position.factory';
import { StructureType } from '../../../models/models';
import { ContentPosition } from '../..';

export class FlexGrid implements BlockPosition<FlexGrid, StructureType.flexGrid> {
    constructor(
        public structure: StructureType.flexGrid = StructureType.flexGrid,
        public divideBy: 'row' | 'col' = 'row',
        public contentPosition: ContentPosition<StructureType.flexGrid> = {
            'flex-grid': 'flex-grid-values'
        }
    ) {}
}
