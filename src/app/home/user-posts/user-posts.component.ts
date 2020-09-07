import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserPostsService } from './user-post-service/user-posts-service';
import { Subscription } from 'rxjs';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.less']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  userDetails:any = null;
  @Input('postsArray')postsArray: Array<any> = [];
   staticImages:Array<any> = [
     {
      imagePost: true,
      videoPost: false,
      imageVideoUrl:'../../assets/images/profile.jpg',
      postComment: 'this is post comment',
      postCategory:'share',
      postedUserName: 'Siva Ramu'

     },
     {
      imagePost: true,
      videoPost: false,
      imageVideoUrl:'../../assets/images/profile.jpg'

     },
     {
      imagePost: true,
      videoPost: false,
      imageVideoUrl:'../../assets/images/profile.jpg'

     }
   ]
  Posts:Array<any>=[];
  userPostsSubscription:Subscription;
  constructor(private userPostsService:UserPostsService,
    private globalEmitterService: GlobalEmittingEventsService) { 
    // this.Posts = [];
    // this.Posts = [...this.userPostsService.posts,...this.staticImages];
  }

  ngOnInit(): void {
 // this.Posts =  this.userPostsService.posts;
   this.userPostsSubscription = this.userPostsService.emitNewUserPost.subscribe(post=>{
   this.postsArray.unshift(post);
   console.log(this.Posts);
    });
    this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails)=>{
      if(userDetails != false){
        this.userDetails = userDetails;
      }
    });
  }

  ngOnDestroy(){
  this.userPostsSubscription.unsubscribe();
  }
}
