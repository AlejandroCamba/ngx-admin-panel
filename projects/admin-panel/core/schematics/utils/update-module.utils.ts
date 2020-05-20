export class ModuleFinder {
  private lookedPath = '';
  private targetName = '';
  private array = [];
  private moduleToUpdate = '';

  /**
   *
   * @param targetName the target dashed parent name file without extension where you want your generated file
   */
  constructor(targetName) {
    this.targetName;
    this.targetName = targetName;
  }

  rFindPossibleModulesToUpdate(bigTree, i = 0) {
    this.lookedPath;

    bigTree.children.forEach(child => {
      if (child.type === 'directory') {
        if (child.children) {
          this.rFindPossibleModulesToUpdate(child, ++i);
        }
      } else {
        if (String(child.name).includes('.module.ts')) {
            this.array.push(bigTree.path);
        }
      }
    });
  }

  /**
   * @param path target path (where you are creating your file)
   */

  findModuleToUpdate(path): string {
    let currentCount = -1;

    this.array.reverse().forEach(possiblePath => {
      if (String(path).includes(possiblePath)) {
        let str = String(path);
        if (currentCount === -1) {
          this.moduleToUpdate = possiblePath;
          currentCount = str.replace(possiblePath, '').length;
        } else {
          if (currentCount > str.replace(possiblePath, '').length) {
            this.moduleToUpdate = possiblePath;
          }
        }
      }
    });

    return this.moduleToUpdate;
  }

  get whatToUpdate() {
    return `${this.moduleToUpdate}/${this.targetName}.module.ts`;
  }
}
