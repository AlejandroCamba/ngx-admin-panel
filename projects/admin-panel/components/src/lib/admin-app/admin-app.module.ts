import { NgModule } from '@angular/core';

import { AdminAppRoutingModule } from './admin-app-routing.module';
import { LayoutService } from '../@theme/layouts/layout.service';
import { AdminMainDirective } from './directives/admin-main.directive';
import { AdminAppComponent } from './admin-app.component';
import { OneColumnLayoutComponent } from '../@theme/layouts/one-column/one-column.layout';

import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    AdminAppRoutingModule,
    ThemeModule.forRoot(),
  ],
  declarations: [AdminMainDirective, AdminAppComponent],
  entryComponents: [AdminAppComponent],
  providers: [LayoutService]
})
export class PagesModule {
}
