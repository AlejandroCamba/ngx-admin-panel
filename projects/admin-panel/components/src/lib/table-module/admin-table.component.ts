import { ViewChild } from '@angular/core';
import { TableComponent } from './table.component';
import { table } from 'console';
import { LocalDataSource } from 'ng2-smart-table';

export abstract class AdminTableComponent {
  @ViewChild(TableComponent) tableComponent: TableComponent;

  onDeleteConfirm;
  onCreateConfirm;
  onSaveConfirm;

  constructor() {
    setTimeout(() => {
      this.tableComponent.onDeleteConfirm = this.onDeleteConfirm;
      this.tableComponent.onCreateConfirm = this.onCreateConfirm;
      this.tableComponent.onSaveConfirm = this.onSaveConfirm;
    });
  }

  loadDataSource = (source) => {
    this.tableComponent.source = new LocalDataSource();
    this.tableComponent.source.load(source);
    this.tableComponent.source.refresh();
  }

  loadTableColumns = (settings) => {
    this.tableComponent.settings = {...this.tableComponent.settings, ...{columns: settings}};
  }

  setTitle = (title) => {
    this.tableComponent.title = title;
  }

  loadingOff = () => {
    this.tableComponent.loading = false;
  }

  loadingOn = () => {
    this.tableComponent.loading = true;
  }

  handleSuccessReq(msg: string) {
    this.tableComponent.showToast('success', msg);
  }

  handleErrorReq(msg: string) {
    this.tableComponent.showToast('danger', msg);
  }
  
}
