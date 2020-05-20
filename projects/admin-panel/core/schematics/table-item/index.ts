import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';

import { Schema as TabView } from './schema';
import { strings } from '@angular-devkit/core';

export function appendTableItem(options: TabView): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const content: Buffer | null = tree.read(
      `src/app/${options.adminView}-view/tabs/${strings.dasherize(
        options.tableView
      )}/${strings.dasherize(options.tableView)}.component.html`
    );

    let strContent: string = '';

    if (content) strContent = content.toString();

    const appendIndex = strContent.indexOf('</admin-table>');

    const content2Append =
      options.itemType === 'pagination'
        ? `  <pagination ${options.position} (filterChanged)="onChange($event)" [pages]="pagination | async"></pagination>`
        : `<filter-adapter ${options.position} #${options.position} (filterChanged)="onChange($event)"><default-${options.itemType} [name]="'${options.name}'" [placeholder]="'${options.placeholder}'"></default-${options.itemType}></filter-adapter>`;

    const updatedContent =
      strContent.slice(0, appendIndex) +
      content2Append +
      strContent.slice(appendIndex);

    tree.overwrite(
      `src/app/${options.adminView}-view/tabs/${strings.dasherize(
        options.tableView
      )}/${strings.dasherize(options.tableView)}.component.html`,
      updatedContent
    );
    return tree;
  };
}
