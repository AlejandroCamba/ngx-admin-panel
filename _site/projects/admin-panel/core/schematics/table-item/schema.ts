export interface Schema {
  // The name of the component.
  name: string;

  placeholder: string;

  //admin view to inject this tab to
  tableView: string;

  itemType: 'dropdown' | 'input' | 'label' | 'pagination';

  position: 'footer' | 'header';

  adminView: string;

  // The path to create the service.
  path?: string;

  // The name of the project.
  project?: string;
}