import { NgModule } from '@angular/core';
import { NbMenuModule, NbIconModule, NbTreeGridModule, NbCardModule } from '@nebular/theme';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
    DashboardModule,
    HttpClientModule
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
