import { BlockPosition } from '../../position.factory';
import { StructureType } from '../../../models/models';
import { ContentPosition } from '../../';

export class Flex implements BlockPosition<Flex, StructureType.flex> {
    constructor(
        public structure: StructureType.flex = StructureType.flex,
        public contentPosition: ContentPosition<StructureType.flex> = {
            flex: 'justify-content-center'
        }
    ) {}
}
