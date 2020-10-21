export interface Schema {
  // The name of the service.
  name: string;

  // adminView to inject this block to
  adminView?: string;

  tabName?: string;

  // The path to create the service.
  path?: string;

  // The name of the project.
  project?: string;

}
