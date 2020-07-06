import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SubModuleAaComponent } from './sub-module-aa.component';

@NgModule({
    declarations: [SubModuleAaComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [SubModuleAaComponent]
})
export class AAModule {}
