import { BlockPosition } from '../../position.factory';
import { StructureType } from '../../../models/models';
import { ContentPosition } from '../../';

export class Block implements BlockPosition<Block, StructureType.block> {
    constructor(
        public structure: StructureType.block = StructureType.block,
        public contentPosition: ContentPosition<StructureType.block> = {
            block: 'block-values'
        }
    ) {}
}
