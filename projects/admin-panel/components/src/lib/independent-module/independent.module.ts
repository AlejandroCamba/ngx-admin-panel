import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button.component';
import { FormAdapterComponent } from './adapters/form-adapter.component';
import { AdminFormComponent } from './containers/admin-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputComponent } from './components/input.component';
import { DropdownComponent } from './components/dropdown.component';
import { LabelComponent } from './components/label.component';
import { TableAdapterComponent } from './adapters/table-adapter.component';
import { FilterAdapterComponent } from './adapters/filter-adapter.component';
import { PaginationComponent } from './components/pagination.component';
import { NextPageComponent } from './containers/next-page/next-page.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
        ButtonComponent,
        InputComponent,
        DropdownComponent,
        LabelComponent,
        FormAdapterComponent,
        TableAdapterComponent,
        FilterAdapterComponent,
        PaginationComponent,
        AdminFormComponent,
        NextPageComponent
    ],
    exports: [
        ButtonComponent,
        InputComponent,
        DropdownComponent,
        LabelComponent,
        FormAdapterComponent,
        TableAdapterComponent,
        FilterAdapterComponent,
        PaginationComponent,
        AdminFormComponent,
        NextPageComponent
    ]
})
export class IndependentModule {}
