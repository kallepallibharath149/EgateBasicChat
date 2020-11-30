import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { MainHomePageComponent } from './main-home-page/main-home-page.component';
// import { GroupsComponent } from './groups/groups.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EventsComponent } from './events/events.component';
// import { NewsComponent } from './news/news.component';
// import { MoviesComponent } from './movies/movies.component';
import { PhotosComponent } from './profile-details/photos/photos.component';
import { VideosComponent } from './profile-details/videos/videos.component';
import { FriendsComponent } from './profile-details/friends/friends.component';
import { ProfileTimeLineComponent } from './profile-details/profile-time-line/profile-time-line.component';
import { AboutComponent } from './profile-details/about/about.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { ModalOpenCanDeactivateGuardGuard } from './common/guards/modal-open-can-deactivate-guard.guard';
import { LoginComponent } from './login/login.component';
import { EventPreviewComponent } from './events/event-preview/event-preview.component';
import { InvitationsComponent } from './events/invitations/invitations.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupspreviewComponent } from './groups/groupspreview/groupspreview.component';
import { CreategroupComponent } from './groups/creategroup/creategroup.component';
// import { CanRedirectToGroupsHomeGuard } from './common/guards/can-redirect-to-groups-home.guard';
import { NavigateBookmarksComponent } from './top-banner/navigate-bookmarks/navigate-bookmarks.component';
// import { MainPageGroupsContainerComponent } from './main-home-page/main-page-groups-container/main-page-groups-container.component';
// import { RedirectTogroupsComponent } from './main-home-page/main-page-groups-container/redirect-togroups/redirect-togroups.component';
import { CustomPreloadingService } from './services/custom.preloading.service';
import { NewImplementationComponent } from './new-implementation/new-implementation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // {path: 'app', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)},
   {path: 'testtt',  data: { preload: true }, loadChildren: () => import('./main-app-module/main-app.module').then(m => m.MainAppModule)},
  // { path: 'home', component: MainHomePageComponent,
  //   children: [
  //     { path: 'redirect', component:RedirectTogroupsComponent,
  //     canActivate: [CanRedirectToGroupsHomeGuard],},
  //     { path: 'groupsPosts/:groupId', component:MainPageGroupsContainerComponent  },
  //   ]
  // },
  // { path: 'news', component: NewsComponent },  done
  // { path: 'movies', component: MoviesComponent }, done
  { path: 'implementation', component: NewImplementationComponent },//done
  // { path: 'groups', component: GroupsComponent,
  // children: [
  //   { path: '', component: GroupsListComponent },
  //   { path: 'preview/:groupId', component: GroupspreviewComponent },
  //   { path: 'create', component: CreategroupComponent },
  //   // { path: 'invitations', component: InvitationsComponent }
  // ] },
  // { path: 'events', component: EventsComponent ,
  // children: [
  //   { path: '', component: EventsListComponent },
  //   { path: 'preview', component: EventPreviewComponent },
  //   { path: 'create', component: CreateEventComponent },
  //   { path: 'invitations', component: InvitationsComponent }
  // ]},
  // { path: 'profile/:id', component: ProfileDetailsComponent,
  //  children: [
  //   { path: '', component: ProfileTimeLineComponent,
  //   canDeactivate: [ModalOpenCanDeactivateGuardGuard]
  // },
  //   { path: 'photos', component: PhotosComponent ,
  //   canDeactivate: [ModalOpenCanDeactivateGuardGuard]
  // },
  //   { path: 'videos', component: VideosComponent,
  //   canDeactivate: [ModalOpenCanDeactivateGuardGuard]
  //  },
  //   { path: 'connections', component: FriendsComponent },
  //   { path: 'about', component: AboutComponent }
  // ],
  // canDeactivate: [ModalOpenCanDeactivateGuardGuard]},
  // { path: 'bookmarks', component: NavigateBookmarksComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,scrollPositionRestoration: 'enabled',preloadingStrategy: CustomPreloadingService})],//,enableTracing:true
  exports: [RouterModule]
})
export class AppRoutingModule { }
