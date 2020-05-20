import { NgModule } from '@angular/core';
import { GraphComponent } from './graph.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [GraphComponent],
    imports: [CommonModule],
    exports: [GraphComponent],
})
export class GraphModule {}
