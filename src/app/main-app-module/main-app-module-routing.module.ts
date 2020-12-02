import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanRedirectToGroupsHomeGuard } from '@app/common/guards/can-redirect-to-groups-home.guard';
import { ModalOpenCanDeactivateGuardGuard } from '@app/common/guards/modal-open-can-deactivate-guard.guard';
import { CreateEventComponent } from '@app/events/create-event/create-event.component';
import { EventPreviewComponent } from '@app/events/event-preview/event-preview.component';
import { EventsListComponent } from '@app/events/events-list/events-list.component';
import { EventsComponent } from '@app/events/events.component';
import { InvitationsComponent } from '@app/events/invitations/invitations.component';
import { CreategroupComponent } from '@app/groups/creategroup/creategroup.component';
import { GroupsListComponent } from '@app/groups/groups-list/groups-list.component';
import { GroupsComponent } from '@app/groups/groups.component';
import { GroupspreviewComponent } from '@app/groups/groupspreview/groupspreview.component';
import { MainHomePageComponent } from '@app/main-home-page/main-home-page.component';
import { MainPageGroupsContainerComponent } from '@app/main-home-page/main-page-groups-container/main-page-groups-container.component';
import { RedirectTogroupsComponent } from '@app/main-home-page/main-page-groups-container/redirect-togroups/redirect-togroups.component';
import { NoGroupsInfoComponent } from '@app/main-home-page/no-groups-info/no-groups-info.component';
import { MoviesComponent } from '@app/movies/movies.component';
import { NewsComponent } from '@app/news/news.component';
import { AboutComponent } from '@app/profile-details/about/about.component';
import { FriendsComponent } from '@app/profile-details/friends/friends.component';
import { PhotosComponent } from '@app/profile-details/photos/photos.component';
import { ProfileDetailsComponent } from '@app/profile-details/profile-details.component';
import { ProfileTimeLineComponent } from '@app/profile-details/profile-time-line/profile-time-line.component';
import { VideosComponent } from '@app/profile-details/videos/videos.component';
import { NavigateBookmarksComponent } from '@app/top-banner/navigate-bookmarks/navigate-bookmarks.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [

      {
        path: 'groupsPosts', component: MainHomePageComponent,
        children: [
          // { path: '', component: MainPageGroupsContainerComponent },
          { path: 'redirect', component:RedirectTogroupsComponent,
          canActivate: [CanRedirectToGroupsHomeGuard],},
          { path: 'details/:groupId', component:MainPageGroupsContainerComponent  },
          { path: 'noGroups', component: NoGroupsInfoComponent  }
        ]
      },

      // { path: 'groupsPosts/:groupId', component:MainPageGroupsContainerComponent  },

      { path: 'news', component: NewsComponent },

      { path: 'movies', component: MoviesComponent },

      {
        path: 'groups', component: GroupsComponent,
        children: [
          { path: '', component: GroupsListComponent },
          { path: 'preview/:groupId', component: GroupspreviewComponent },
          { path: 'create', component: CreategroupComponent },
          // { path: 'invitations', component: InvitationsComponent }
        ]
      },

      {
        path: 'events', component: EventsComponent,
        children: [
          { path: '', component: EventsListComponent },
          { path: 'preview', component: EventPreviewComponent },
          { path: 'create', component: CreateEventComponent },
          { path: 'invitations', component: InvitationsComponent }
        ]
      },

      {
        path: 'profile/:id', component: ProfileDetailsComponent,
        children: [
          {
            path: '', component: ProfileTimeLineComponent,
            canDeactivate: [ModalOpenCanDeactivateGuardGuard]
          },
          {
            path: 'photos', component: PhotosComponent,
            canDeactivate: [ModalOpenCanDeactivateGuardGuard]
          },
          {
            path: 'videos', component: VideosComponent,
            canDeactivate: [ModalOpenCanDeactivateGuardGuard]
          },
          { path: 'connections', component: FriendsComponent },
          { path: 'about', component: AboutComponent }
        ],
        canDeactivate: [ModalOpenCanDeactivateGuardGuard]
      },

      { path: 'bookmarks', component: NavigateBookmarksComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class MainAppModuleRoutingModule {
}
