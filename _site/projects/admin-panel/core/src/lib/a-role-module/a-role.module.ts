import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AbilityModule } from '@casl/angular';
import { Ability } from '@casl/ability';
import { ARoleService } from './a-role.service';
import { MyCanPipe } from './pipe/can.pipe';

@NgModule({
    declarations: [MyCanPipe],
    imports: [AbilityModule.forRoot(), BrowserModule, FormsModule],
    providers: [{ provide: Ability, useFactory: ARoleService.createAbility }, ARoleService],
    exports: [MyCanPipe],
    bootstrap: []
})
export class ARoleModule {}
