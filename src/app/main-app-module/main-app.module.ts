import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppModuleRoutingModule } from './main-app-module-routing.module';
import { SharedServiceModule } from '@app/common/shared.module';
import { DragulaModule } from 'ng2-dragula';
import { NgxLoadingModule } from '@app/common/ngx-loader/lib/ngx-loading.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TopBannerComponent } from '@app/top-banner/top-banner.component';
import { TopNavigationMenuComponent } from '@app/top-banner/top-navigation-menu/top-navigation-menu.component';
import { AccountAndProfileComponent } from '@app/top-banner/account-and-profile/account-and-profile.component';
import { LeftContainerComponent } from '@app/main-home-page/left-container/left-container.component';
import { RightContainerComponent } from '@app/main-home-page/right-container/right-container.component';
import { MainHomePageComponent } from '@app/main-home-page/main-home-page.component';

@NgModule({
  declarations: [
    // MainLayoutComponent,
    // TopBannerComponent,
    // TopNavigationMenuComponent,
    // AccountAndProfileComponent,
    // LeftContainerComponent,
    // RightContainerComponent,
    // MainHomePageComponent
  ],
  imports: [
    CommonModule,
    SharedServiceModule,
    MainAppModuleRoutingModule,
    DragulaModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ]
})
export class MainAppModule { }
