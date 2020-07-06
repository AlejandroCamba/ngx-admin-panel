export interface Schema {
  //admin view to inject this tab to
  adminView: string;

  tabName: string;

  // The path to create the service.
  path?: string;

  // The name of the project.
  project?: string;
}