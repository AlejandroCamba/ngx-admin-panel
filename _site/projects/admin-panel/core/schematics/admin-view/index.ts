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
} from "@angular-devkit/schematics";

import { strings, normalize, experimental } from "@angular-devkit/core";

import { Schema as MyAdminView } from "./schema";

export function adminViewComponent(options: MyAdminView): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read("/angular.json");
    if (!workspaceConfig) {
      throw new SchematicsException(
        "Could not find Angular workspace configuration"
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

    const projectType = project.projectType === "application" ? "app" : "lib";

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    const dirTree = require("directory-tree");
    const filteredTree = dirTree(project.sourceRoot);

    let lookedPath: string;
    let closestModulePath = [];
    let moduletoUpdate = "";
    lookedPath;
    
    function rFindModule(tree) {
      if (`${strings.dasherize(options.name)}-view` === tree.name) {
        lookedPath = tree.path;
      }
      console.log(tree);
      tree.children.forEach(child => {
        if (child.type === "directory") {
          if (child.children) {
            rFindModule(child);
          }
        } else {
          if (String(child.name).includes(".module.ts")) {
            closestModulePath.push(child.path);
          }
        }
      });
    }

    rFindModule(filteredTree.children[0]);

    let currentCount = -1;

    closestModulePath.reverse().forEach(path => {
      if (String(path).includes(options.path)) {
        let str = String(path);
        if (currentCount === -1) {
          moduletoUpdate = path;
          currentCount = str.replace(options.path, "").length;
        } else {
          if (currentCount > str.replace(path, "").length) {
            moduletoUpdate = path;
          }
        }
      }
    });

    const content: Buffer | null = tree.read(moduletoUpdate);
    let strContent: string = "";

    if (content) strContent = content.toString();

    const appendIndex =
      strContent.indexOf("[", strContent.indexOf("imports")) + 1;
    const importStatement = `\n \xa0\xa0${strings.classify(options.name)}ViewModule,`;

    let updatedContent =
      strContent.slice(0, appendIndex) +
      importStatement +
      strContent.slice(appendIndex);

    updatedContent =
      `import { ${strings.classify(
        options.name
      )}ViewModule } from './${strings.dasherize(
        options.name
      )}-view/${strings.dasherize(options.name)}-view.module'\n` +
      updatedContent;

    tree.overwrite(moduletoUpdate, updatedContent);

    const templateSource = apply(url("./files"), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
