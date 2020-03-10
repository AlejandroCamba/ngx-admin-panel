import { NgModule } from '@angular/core';
import { TabDirective } from './tab.directive';
import { TabsComponent } from './tabs.component';
import { CommonModule } from '@angular/common';
import { BlockModule } from '@admin-panel/core';

@NgModule({
    declarations: [TabDirective, TabsComponent],
    imports: [CommonModule, BlockModule],
    exports: [TabDirective, TabsComponent]
})
export class TabsModule {}
