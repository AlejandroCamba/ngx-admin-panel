import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { tableData } from '../../data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="eva eva-plus-outline"></i>',
      createButtonContent: '<i class="eva eva-checkmark-outline"></i>',
      cancelButtonContent: '<i class="eva eva-close-outline"></i>',
    },
    edit: {
      editButtonContent: '<i class="eva eva-edit-outline"></i>',
      saveButtonContent: '<i class="eva eva-checkmark-outline"></i>',
      cancelButtonContent: '<i class="eva eva-close-outline"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="eva eva-trash-outline"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor() {
    this.source.load(tableData);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
