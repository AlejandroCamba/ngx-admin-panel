import { Grid } from './families/grid/grid.model';
import { PStructures, ContentPosition } from '.';
import { SGrid } from './families/grid';

export const PositionFactory = <T = Grid, S = SGrid>(
    recipe: BlockPosition<T, S extends PStructures ? S : null>
) => recipe;

export interface BlockPosition<T, S extends PStructures> {
    contentPosition: ContentPosition<S>;
    structure: S;
}
