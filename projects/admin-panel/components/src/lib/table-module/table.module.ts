import { NgModule } from '@angular/core';
import { BlockModule } from '@admin-panel/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    BlockModule,
    Ng2SmartTableModule, // NECESARIO PARA SMART TABLES
    NbCardModule,        // NECESARIO PARA SMART TABLES
    NbTreeGridModule,    // NECESARIO PARA SMART TABLES
    NbIconModule         // NECESARIO PARA SMART TABLES],
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {}
