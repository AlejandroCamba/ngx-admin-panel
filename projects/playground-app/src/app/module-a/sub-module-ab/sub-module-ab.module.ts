import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SubModuleAbComponent } from './sub-module-ab.component';

@NgModule({
    declarations: [SubModuleAbComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [SubModuleAbComponent],
    exports: [SubModuleAbComponent]
})
export class ABModule {}
