import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-main-page-groups-container',
  templateUrl: './main-page-groups-container.component.html',
  styleUrls: ['./main-page-groups-container.component.less']
})
export class MainPageGroupsContainerComponent implements OnInit {
  currentGroupId: string;
  latestPosts: Array<any> = [];
  constructor(private httpService:HttpService,
             private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.has('id')); // true has() ,get(),      getAll()
      this.currentGroupId = params.get('groupId');
      this.latestPosts = [];
      this.getInitialLatestPosts();
      // alert(this.currentGroupId);
    });
    
  }

  getInitialLatestPosts() {
    this.getLatestPosts('initialization');
    }
    
  getLatestPosts(state?) {
    this.httpService.httpGet('User/111/LatestPosts').subscribe((response) => {
      console.log(response);
      if (Array.isArray(response) && response.length > 0) {
        let postsArray = [];
        response.forEach(timelinePost => {
          let postDetails: any = {};
          postDetails.profileId = timelinePost.profileId;
          postDetails.userName = timelinePost.userName;
          postDetails.isMine = timelinePost.isMine;
          if (timelinePost.postDetails.postType == 'Image') {
            postDetails.imagePost = true;
            postDetails.videoPost = false;
          } else if (timelinePost.postDetails.postType == 'Video') {
            postDetails.videoPost = true;
            postDetails.imagePost = false;
          }
          postDetails.imageVideoUrl = timelinePost.postDetails.postUrl;
          postDetails.postComment = timelinePost.postDetails.postText;
          postsArray.push(postDetails);
        });
        if(state == 'initialization'){
          this.latestPosts = [];
        }
        if (Array.isArray(postsArray) && postsArray.length > 0) {
          this.latestPosts = [...this.latestPosts, ...postsArray];
        } 
      }
    }, (error) => {
      console.log(error);
    });
  }

}
