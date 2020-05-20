import { NgModule } from '@angular/core';
import { TabDirective } from './tab.directive';
import { TabsComponent } from './tabs.component';
import { CommonModule } from '@angular/common';
import { BlockModule } from '@admin-panel/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [TabDirective, TabsComponent],
    imports: [CommonModule, BrowserModule, BlockModule],
    exports: [TabDirective, TabsComponent]
})
export class TabsModule {}
