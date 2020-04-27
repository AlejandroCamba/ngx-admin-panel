/*
 * Public API Surface of admin-panel-generator
 */
export * from './lib/block/block.module';
export * from './lib/block/block.abstract.component';
export * from './lib/block/directives/block.directive';

// families of BlockPosition
export * from './lib/block/factories/families/block/block.model';
export * from './lib/block/factories/families/flex/flex.model';
export * from './lib/block/factories/families/flex-grid/flex-grid.model';
export * from './lib/block/factories/families/grid/grid.model';

// block factory consumers
export * from './lib/block/factories/position.factory';

// services
// state
export * from './lib/state-service/a-state-service';

// parent state implementer
export * from './lib/admin-state-directive/a-admin-state.directive';

//ARoleModule
export * from './lib/a-role-module/a-role.module';
export * from './lib/a-role-module/a-role.service';
export * from './lib/a-role-module/pipe/can.pipe';

// aux implementations

export * from './lib/block/factories/index';
export * from './lib/block/models/models';
