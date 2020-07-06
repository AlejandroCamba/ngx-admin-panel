import {
  Rule,
  Tree,
  SchematicsException,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith
} from '@angular-devkit/schematics';

import { strings, normalize, experimental } from '@angular-devkit/core';

import { Schema as MyBlockSchema } from './schema';
import { ModuleFinder } from '../utils/update-module.utils';

export function tableComponent(options: MyBlockSchema): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException(
        'Could not find Angular workspace configuration'
      );
    }

    // convert workspace to string
    const workspaceContent = workspaceConfig.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(
      workspaceContent
    );

    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    if (options.adminView) {
      const content: Buffer | null = tree.read(
        `src/app/${options.adminView}-view/${options.adminView}-view.component.html`
      );
      let strContent: string = '';

      if (content) strContent = content.toString();

      let appendIndex = null;

      if (options.tabName) {
        appendIndex = strContent.indexOf(options.tabName);
        appendIndex = strContent.indexOf('</div>', appendIndex);
      } else {
        appendIndex = strContent.indexOf('</admin-tab-menu>');
      }

      const content2Append = `<admin-table-${strings.dasherize(options.name)}></admin-table-${strings.dasherize(options.name)}>`;
      const updatedContent =
        strContent.slice(0, appendIndex) +
        content2Append +
        strContent.slice(appendIndex);

      tree.overwrite(
        `src/app/${options.adminView}-view/${options.adminView}-view.component.html`,
        updatedContent
      );

      const dirTree = require("directory-tree");
      const filteredTree = dirTree(project.sourceRoot);

      const moduleFinder = new ModuleFinder(`${options.adminView}-view`);

      moduleFinder.rFindPossibleModulesToUpdate(filteredTree.children[0]);
      moduleFinder.findModuleToUpdate(`src/app/${strings.dasherize(options.adminView)}-view/tabs`);

      const containerModule: Buffer | null = tree.read(moduleFinder.whatToUpdate);
      let containerModuleContent: string = "";
  
      if (containerModule) containerModuleContent = containerModule.toString();
  
      const toAppend =
      containerModuleContent.indexOf("[", containerModuleContent.indexOf("declarations")) + 1;
      const importStatement = `\n \xa0\xa0${strings.classify(options.name)}TableComponent,`;
  
      let moduleUpdatedContent =
      containerModuleContent.slice(0, toAppend) +
        importStatement +
        containerModuleContent.slice(toAppend);
  
        moduleUpdatedContent =
        `import { ${strings.classify(
          options.name
        )}TableComponent } from './tabs/${strings.dasherize(
          options.name
        )}/${strings.dasherize(options.name)}.component'\n` +
        moduleUpdatedContent;
  
      tree.overwrite(moduleFinder.whatToUpdate, moduleUpdatedContent);
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        camelize: strings.camelize,
        underscore: strings.underscore,
        name: options.name
      }),
      move(normalize((options.adminView ? `src/app/${options.adminView}-view/tabs` : options.path) as string))
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
