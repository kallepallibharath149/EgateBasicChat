import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
  import { DragulaModule } from 'ng2-dragula';
//  DragulaModule
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceModule } from './common/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import {MessageService} from 'primeng/api';
import { GlobalEmittingEventsService } from './services/global-emitting-events.service';
import { UserPostsService } from './home/user-posts/user-post-service/user-posts-service';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { TopNavigationMenuComponent } from './top-banner/top-navigation-menu/top-navigation-menu.component';
import { AccountAndProfileComponent } from './top-banner/account-and-profile/account-and-profile.component';
import { PostUploadComponent } from './home/post-upload/post-upload.component';
import { UserPostsComponent } from './home/user-posts/user-posts.component';

import { LeftContainerComponent } from './main-home-page/left-container/left-container.component';
import { RightContainerComponent } from './main-home-page/right-container/right-container.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { EventsComponent } from './events/events.component';
import { MessengerComponent } from './messenger/messenger.component';
import { MainHomePageMessengerComponent } from './main-home-page-messenger/main-home-page-messenger.component';
import { NavigateBookmarksComponent } from './navigate-bookmarks/navigate-bookmarks.component';
import { PostDetailsComponent } from './home/user-posts/post-details/post-details.component';
import { NewsComponent } from './news/news.component';
import { ProfileCoverPhotosComponent } from './profile-details/profile-cover-photos/profile-cover-photos.component';
import { PhotosComponent } from './profile-details/photos/photos.component';
import { VideosComponent } from './profile-details/videos/videos.component';
import { FriendsComponent } from './profile-details/friends/friends.component';
import { ProfileTimeLineComponent } from './profile-details/profile-time-line/profile-time-line.component';
import { OverLayComponentComponent } from './common/over-lay-component/over-lay-component.component';
import { PhotosGridComponent } from './profile-details/photos-grid/photos-grid.component';
import { AboutComponent } from './profile-details/about/about.component';

import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventsListComponent } from './events/events-list/events-list.component';

import { ParentRootComponentComponent } from './parent-root-component/parent-root-component.component';
import { CommentsContainerComponent } from './common/comments-container/comments-container.component';
import { MainCommentComponent } from './common/comments-container/main-comment/main-comment.component';
import { ReplyCommentComponent } from './common/comments-container/main-comment/reply-comment/reply-comment.component';
import { ModalOpenCanDeactivateGuardGuard } from './common/guards/modal-open-can-deactivate-guard.guard';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './login/login-service.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app-route-reuse.strategy';
import { EventPreviewComponent } from './events/event-preview/event-preview.component';
import { HttpService } from './interceptors/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptors/api.prefix.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    MainHomePageComponent,
    TopBannerComponent,
    TopNavigationMenuComponent,
    AccountAndProfileComponent,
    PostUploadComponent,
    UserPostsComponent,
    LeftContainerComponent,
    RightContainerComponent,
    GroupsComponent,
    ProfileDetailsComponent,
    EventsComponent,
    MessengerComponent,
    MainHomePageMessengerComponent,
    NavigateBookmarksComponent,
    PostDetailsComponent,
    NewsComponent,
    ProfileCoverPhotosComponent,
    PhotosComponent,
    VideosComponent,
    FriendsComponent,
    ProfileTimeLineComponent,
    OverLayComponentComponent,
    PhotosGridComponent,
    AboutComponent,
    CreateEventComponent,
    EventsListComponent,
    ParentRootComponentComponent,
     CommentsContainerComponent,
     MainCommentComponent, 
     ReplyCommentComponent, LoginComponent, EventPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    SharedServiceModule,
    DragulaModule.forRoot(),
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    
    HttpService, 
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    GlobalEmittingEventsService,LoginServiceService,
              UserPostsService, MessageService,ModalOpenCanDeactivateGuardGuard,NgbActiveModal
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
