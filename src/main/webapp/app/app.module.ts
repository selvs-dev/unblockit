import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { UnblockItSharedModule } from 'app/shared/shared.module';
import { UnblockItCoreModule } from 'app/core/core.module';
import { UnblockItAppRoutingModule } from './app-routing.module';
import { UnblockItHomeModule } from './home/home.module';
import { UnblockItEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    UnblockItSharedModule,
    UnblockItCoreModule,
    UnblockItHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    UnblockItEntityModule,
    UnblockItAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class UnblockItAppModule {}
