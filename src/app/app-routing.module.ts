import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EventsComponent } from './events/events.component';
import { NavigateBookmarksComponent } from './navigate-bookmarks/navigate-bookmarks.component';
import { MessengerComponent } from './messenger/messenger.component';
import { NewsComponent } from './news/news.component';
import { MoviesComponent } from './movies/movies.component';
import { ConnectionsComponent } from './connections/connections.component';
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
import { MainPageGroupsContainerComponent } from './main-page-groups-container/main-page-groups-container.component';
import { MiddleContainerComponent } from './main-home-page/middle-container/middle-container.component';
import { RedirectTogroupsComponent } from './main-page-groups-container/redirect-togroups/redirect-togroups.component';
import { CanRedirectToGroupsHomeGuard } from './common/guards/can-redirect-to-groups-home.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: MainHomePageComponent,
    children: [
   // { path: 'latestPosts', component: MiddleContainerComponent },
      { path: 'redirect', component:RedirectTogroupsComponent,
      canActivate: [CanRedirectToGroupsHomeGuard],},
      { path: 'groupsPosts/:groupId', component:MainPageGroupsContainerComponent  },
    ]
  },
  { path: 'news', component: NewsComponent },
  { path: 'connections', component: ConnectionsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'messenger', component: MessengerComponent },
  { path: 'groups', component: GroupsComponent,
  children: [
    { path: '', component: GroupsListComponent },
    { path: 'preview', component: GroupspreviewComponent },
    { path: 'create', component: CreategroupComponent },
    // { path: 'invitations', component: InvitationsComponent }
  ] },
  { path: 'events', component: EventsComponent ,
  children: [
    { path: '', component: EventsListComponent },
    { path: 'preview', component: EventPreviewComponent },
    { path: 'create', component: CreateEventComponent },
    { path: 'invitations', component: InvitationsComponent }
  ]},
  { path: 'profile/:id', component: ProfileDetailsComponent,
   children: [
    { path: '', component: ProfileTimeLineComponent,
    canDeactivate: [ModalOpenCanDeactivateGuardGuard]
  },
    { path: 'photos', component: PhotosComponent ,
    canDeactivate: [ModalOpenCanDeactivateGuardGuard]
  },
    { path: 'videos', component: VideosComponent,
    canDeactivate: [ModalOpenCanDeactivateGuardGuard]
   },
    { path: 'connections', component: FriendsComponent },
    { path: 'about', component: AboutComponent }
  ],
  canDeactivate: [ModalOpenCanDeactivateGuardGuard]},
  // { path: 'profile/:id/:photos', component: PhotosComponent },
  { path: 'bookmarks', component: NavigateBookmarksComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,scrollPositionRestoration: 'enabled' })],//,enableTracing:true
  exports: [RouterModule]
})
export class AppRoutingModule { }
