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
import { NewsComponent } from '@app/news/news.component';
import { MoviesComponent } from '@app/movies/movies.component';
import { RedirectTogroupsComponent } from '@app/main-home-page/main-page-groups-container/redirect-togroups/redirect-togroups.component';
import { CanRedirectToGroupsHomeGuard } from '@app/common/guards/can-redirect-to-groups-home.guard';
import { MainPageGroupsContainerComponent } from '@app/main-home-page/main-page-groups-container/main-page-groups-container.component';
import { HomeComponent } from '@app/home/home.component';
import { GroupsComponent } from '@app/groups/groups.component';
import { GroupsListComponent } from '@app/groups/groups-list/groups-list.component';
import { GroupspreviewComponent } from '@app/groups/groupspreview/groupspreview.component';
import { CreategroupComponent } from '@app/groups/creategroup/creategroup.component';
import { EventsComponent } from '@app/events/events.component';
import { EventsListComponent } from '@app/events/events-list/events-list.component';
import { EventPreviewComponent } from '@app/events/event-preview/event-preview.component';
import { CreateEventComponent } from '@app/events/create-event/create-event.component';
import { InvitationsComponent } from '@app/events/invitations/invitations.component';
import { ProfileDetailsComponent } from '@app/profile-details/profile-details.component';
import { ProfileTimeLineComponent } from '@app/profile-details/profile-time-line/profile-time-line.component';
import { ModalOpenCanDeactivateGuardGuard } from '@app/common/guards/modal-open-can-deactivate-guard.guard';
import { PhotosComponent } from '@app/profile-details/photos/photos.component';
import { VideosComponent } from '@app/profile-details/videos/videos.component';
import { FriendsComponent } from '@app/profile-details/friends/friends.component';
import { AboutComponent } from '@app/profile-details/about/about.component';
import { NavigateBookmarksComponent } from '@app/top-banner/navigate-bookmarks/navigate-bookmarks.component';
import { PostUploadComponent } from '@app/home/post-upload/post-upload.component';
import { UserPostsComponent } from '@app/home/user-posts/user-posts.component';
import { PostDetailsComponent } from '@app/home/user-posts/post-details/post-details.component';
import { ProfileCoverPhotosComponent } from '@app/profile-details/profile-cover-photos/profile-cover-photos.component';
import { PhotosGridComponent } from '@app/profile-details/photos-grid/photos-grid.component';
import { BarComponent } from '@app/d3Charts/bar/bar.component';
import { PieComponent } from '@app/d3Charts/pie/pie.component';
import { ScatterComponent } from '@app/d3Charts/scatter/scatter.component';
import { SecureFilesUrlPipe } from '@app/common/pipes/secureFiles.pipe';
import { OverLayComponentComponent } from '@app/common/over-lay-component/over-lay-component.component';
import { CommentsContainerComponent } from '@app/common/comments-container/comments-container.component';
import { MainCommentComponent } from '@app/common/comments-container/main-comment/main-comment.component';
import { ReplyCommentComponent } from '@app/common/comments-container/main-comment/reply-comment/reply-comment.component';
import { ProfileWithCommentsComponent } from '@app/common/profile-with-comments/profile-with-comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoGroupsInfoComponent } from '../main-home-page/no-groups-info/no-groups-info.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    TopBannerComponent,
    TopNavigationMenuComponent,
    AccountAndProfileComponent,
    NewsComponent,
    MoviesComponent,
    LeftContainerComponent,
    RightContainerComponent,
    MainHomePageComponent,
    RedirectTogroupsComponent,
    MainPageGroupsContainerComponent,
    HomeComponent,
    PostUploadComponent,
    UserPostsComponent,
    PostDetailsComponent,
    GroupsComponent,
    GroupsListComponent,
    GroupspreviewComponent,
    CreategroupComponent,
    EventsComponent,
    EventsListComponent,
    EventPreviewComponent,
    CreateEventComponent,
    InvitationsComponent,
    ProfileDetailsComponent,
    ProfileCoverPhotosComponent,
    ProfileTimeLineComponent,
    PhotosGridComponent,
    PhotosComponent,
    VideosComponent,
    FriendsComponent,
    AboutComponent,
    NavigateBookmarksComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    OverLayComponentComponent,
    CommentsContainerComponent,
    MainCommentComponent,
    ReplyCommentComponent,
    ProfileWithCommentsComponent,

    SecureFilesUrlPipe,

    NoGroupsInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedServiceModule,
    MainAppModuleRoutingModule,
    DragulaModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CanRedirectToGroupsHomeGuard,
    ModalOpenCanDeactivateGuardGuard]
})
export class MainAppModule { }
