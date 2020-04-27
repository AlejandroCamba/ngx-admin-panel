import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleBComponent } from './module-b.component';

@NgModule({
    declarations: [ModuleBComponent],
    imports: [CommonModule],
    exports: [ModuleBComponent]
})
export class ModuleBModule {}
