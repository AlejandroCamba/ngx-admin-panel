import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';

import { Schema as TabView } from './schema';

export function appendTab(options: TabView): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const content: Buffer | null = tree.read(
      `src/app/${options.adminView}-view/${options.adminView}-view.component.html`
    );
    let strContent: string = '';

    if (content) strContent = content.toString();

    const appendIndex = strContent.indexOf('</admin-tab-menu>');
    const content2Append = `  <div admin-tab [tabTitle]="'${options.tabName}'"></div>\n`;
    const updatedContent =
      strContent.slice(0, appendIndex) +
      content2Append +
      strContent.slice(appendIndex);

    tree.overwrite(
      `src/app/${options.adminView}-view/${options.adminView}-view.component.html`,
      updatedContent
    );
    return tree;
  };
}
