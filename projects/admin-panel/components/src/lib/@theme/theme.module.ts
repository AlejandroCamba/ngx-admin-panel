import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HeaderComponent,
} from './components';

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

// import {
//   OneColumnLayoutComponent,
//   ThreeColumnsLayoutComponent,
//   TwoColumnsLayoutComponent,
// } from './layouts';

import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];

// import {
//   CapitalizePipe,
//   PluralPipe,
//   RoundPipe,
//   TimingPipe,
//   NumberWithCommasPipe,
// } from './pipes';
import { FooterComponent } from './components/footer/footer.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

const COMPONENTS = [
  // HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  // OneColumnLayoutComponent,
  // ThreeColumnsLayoutComponent,
  // TwoColumnsLayoutComponent,
];

const PIPES = [

];


@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS, ...NB_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
      ],
      
    };
  }
}
