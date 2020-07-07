import { NgModule } from '@angular/core';

import { AdminAppRoutingModule } from './admin-app-routing.module';
import { LayoutService } from '../@theme/layouts/layout.service';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';
import { OneColumnLayoutComponent } from '../@theme/layouts/one-column/one-column.layout';

import { ThemeModule } from '../@theme/theme.module';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    AdminAppRoutingModule,
    NbChatModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  declarations: [AdminMainDirective, AdminAppComponent],
  entryComponents: [AdminAppComponent],
  providers: [LayoutService],
  exports: [AdminMainDirective]
})
export class AdminAppModule {
}
