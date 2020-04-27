import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabsModule, TabsComponent, TabDirective } from '@admin-panel/components';
import { BlockModule, ARoleModule } from '@admin-panel/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../independent-module/components/dropdown.component';
import { ButtonComponent } from '../independent-module/components/button.component';
import { LabelComponent } from '../independent-module/components/label.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { IndependentModule } from '../independent-module/independent.module';

@NgModule({
    imports: [CommonModule, IndependentModule, NgxDatatableModule, BlockModule],
    declarations: [TableComponent],
    entryComponents: [ButtonComponent, DropdownComponent, LabelComponent],
    bootstrap: [],
    exports: [TableComponent]
})
export class TableModule {}
