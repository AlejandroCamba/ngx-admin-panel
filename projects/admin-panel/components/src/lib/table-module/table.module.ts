import { NgModule } from '@angular/core';
import { BlockModule } from '@admin-panel/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ButtonComponent } from '../independent-module/components/button.component';
import { DropdownComponent } from '../independent-module/components/dropdown.component';
import { LabelComponent } from '../independent-module/components/label.component';
import { IndependentModule } from '../independent-module/independent.module';

@NgModule({
  imports: [CommonModule, IndependentModule, NgxDatatableModule, BlockModule],
  declarations: [TableComponent],
  entryComponents: [ButtonComponent, DropdownComponent, LabelComponent],
  bootstrap: [],
  exports: [TableComponent]
})
export class TableModule {}
