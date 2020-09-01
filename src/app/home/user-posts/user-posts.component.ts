import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserPostsService } from './user-post-service/user-posts-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.less']
})
export class UserPostsComponent implements OnInit, OnDestroy {
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
  constructor(private userPostsService:UserPostsService) { 
    this.Posts = [];
    this.Posts = [...this.userPostsService.posts,...this.staticImages];
  }

  ngOnInit(): void {
 // this.Posts =  this.userPostsService.posts;
  this.userPostsSubscription = this.userPostsService.emitNewUserPost.subscribe(post=>{
   this.Posts.unshift(post);
   console.log(this.Posts);
    });
  }

  ngOnDestroy(){
  this.userPostsSubscription.unsubscribe();
  }
}
