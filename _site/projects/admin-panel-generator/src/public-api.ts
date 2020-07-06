/*
 * Public API Surface of admin-panel-generator
 */

export * from './lib/components/test/test.module';
export * from './lib/components/test/test.component';

export * from './lib/containers/block/block.module';
export * from './lib/containers/block/block.abstract.component';
export * from './lib/containers/block/directives/block.directive';

// families of BlockPosition
export * from './lib/containers/block/factories/families/block/block.model';
export * from './lib/containers/block/factories/families/flex/flex.model';
export * from './lib/containers/block/factories/families/flex-grid/flex-grid.model';
export * from './lib/containers/block/factories/families/grid/grid.model';

// block factory consumers
export * from './lib/containers/block/factories/position.factory';

// tabs
export * from './lib/components/tabs/tabs.module';
export * from './lib/components/tabs/tabs.component';
export * from './lib/components/tabs/tab.directive';

// services
// state
export * from './lib/services/a-state-service';

// parent state implementer
export * from './lib/parents/admin-state/a-admin-state.directive';

//pruebas
