// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('[~THE MODULE~]');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from '[~THE MODULE~]';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 *~
 *~ Note that if you decide to include this namespace, the module can be
 *~ incorrectly imported as a namespace object, unless
 *~ --esModuleInterop is turned on:
 *~   import * as x from '[~THE MODULE~]'; // WRONG! DO NOT DO THIS!
 */

declare type ATabViewConfig = 'topLeft' | 'verticalLeft' | 'topCenter';

type ContainerBase = {
    width: string;
    height: string;
    backgroundColor: string;
    padding: string;
    margin: string;
};

type ElementBase = {
    width: string;
    height: string;
    backgroundColor: string;
    background: string;
    padding: string;
    margin: string;
    border: string;
    fontStyle: string;
    fontSize: string;
    color: string;
};

type MenuStyle = ContainerBase;

type TabStyle = ElementBase & { active?: Partial<ElementBase> };

declare type ATabViewStyle = {
    tabStyle: Partial<TabStyle>;
    menuStyle: Partial<MenuStyle>;
};
