import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
//  DragulaModule
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceModule } from './common/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from './common/ngx-loader/lib/ngx-loading.module';
import { MessageService } from 'primeng/api';
import { GlobalEmittingEventsService } from './services/global-emitting-events.service';
import { UserPostsService } from './home/user-posts/user-post-service/user-posts-service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './login/login-service.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app-route-reuse.strategy';
import { HttpService } from './interceptors/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptors/api.prefix.interceptor';
import { GroupsService } from './groups/groups.service';
import { GroupVideoPauseService } from './services/group.video.pause.service';
import { groupPostReloadService } from './main-home-page/main-page-groups-container/groupPost.reload';
import { CustomPreloadingService } from './services/custom.preloading.service';
import { NewImplementationComponent } from './new-implementation/new-implementation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    NewImplementationComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    // NgbModule,
    SharedServiceModule,
    DragulaModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    HttpService,
    GroupsService,
    groupPostReloadService,
    GroupVideoPauseService,
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    GlobalEmittingEventsService,
    LoginServiceService,
    UserPostsService,
    CustomPreloadingService,
    MessageService,
    NgbActiveModal,
    // CanRedirectToGroupsHomeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
