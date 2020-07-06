import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModuleaComponent } from './modulea.component';
import { ABModule } from './sub-module-ab/sub-module-ab.module';

@NgModule({
    declarations: [ModuleaComponent],
    imports: [BrowserModule, ABModule],
    bootstrap: [ModuleaComponent],
    exports: [ModuleaComponent]
})
export class AModule {}
