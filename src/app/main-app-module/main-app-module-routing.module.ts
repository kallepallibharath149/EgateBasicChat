import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MainHomePageComponent } from '@app/main-home-page/main-home-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent,
//   children: [
//   { path: 'groupsPosts', component:MainHomePageComponent},
//   // { path: 'groupsPosts/:groupId', component:MainPageGroupsContainerComponent  },
// ] 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppModuleRoutingModule {
 }
