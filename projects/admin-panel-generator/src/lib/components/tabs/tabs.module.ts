import { NgModule } from '@angular/core';
import { TabDirective } from './tab.directive';
import { TabsComponent } from './tabs.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [TabDirective, TabsComponent],
    imports: [CommonModule],
    exports: [TabDirective, TabsComponent]
})
export class TabsModule {}
