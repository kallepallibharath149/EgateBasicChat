import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-middle-container',
  templateUrl: './middle-container.component.html',
  styleUrls: ['./middle-container.component.less']
})
export class MiddleContainerComponent implements OnInit {
  latestPosts: Array<any> = [];
  constructor(private httpService?:HttpService) { }

  ngOnInit(): void {
    this.getInitialLatestPosts();
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
