import { NgModule, } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockModule } from '@ngx-admin-panel/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule, NbCardModule, NbIconModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    BlockModule,
    Ng2SmartTableModule, // NECESARIO PARA SMART TABLES
    NbCardModule,        // NECESARIO PARA SMART TABLES
    NbTreeGridModule,    // NECESARIO PARA SMART TABLES
    NbIconModule,         // NECESARIO PARA SMART TABLES],
    NbSpinnerModule,
    BrowserAnimationsModule,
    NbToastrModule.forRoot()
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {}
