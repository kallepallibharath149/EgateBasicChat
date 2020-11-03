import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UserPostsService } from '../user-post-service/user-posts-service';
import {MessageService} from 'primeng/api';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';
import { comment, post } from '@app/common/models/posts.model';
import { GroupVideoPauseService } from '@app/services/group.video.pause.service';
import { Subscription } from 'rxjs';
import { IprofileDetails } from '@app/common/models/profile.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.less']
})
export class PostDetailsComponent implements OnInit, AfterViewInit ,OnDestroy{
  focusInput: boolean = false;
  postComment: string = '';
  replyPostComment: string = '';
  likeStatus: boolean = false;
  showComments: boolean = false;
  commentsExpanded:boolean = false;
  showCommentsSection: boolean = false;
  commentsArray : Array<comment> = [];
  postLikesProfiles : Array<IprofileDetails> = [];
  videoPlaySubscription:Subscription;
  @ViewChild('postVideoRef',{ static: false }) postVideoRef: ElementRef; 
  @Input('postDetails') postDetails : post;
  @Input('postIndex') postIndex : any;
  @Input('userDetails') userDetails : any;
  loggedInUserId:string = "ed27ac86-2aa8-4341-9b92-1b162b0420d7";
  likesPageNumber:number = 1;


  constructor(private route: Router,
              public domSanitizationService: DomSanitizer,
              private userPostsService : UserPostsService,
              public messageService: MessageService,
              private globalEmitterService: GlobalEmittingEventsService,
              private groupVideoPauseService: GroupVideoPauseService) { }

  ngOnInit(): void {
   this.videoPlaySubscription =  this.groupVideoPauseService.playVideobyPostId.subscribe(postId =>{
      if(postId != this.postDetails.id){
         if((<HTMLVideoElement>(this.postVideoRef.nativeElement)).currentTime > 0){
          (<HTMLVideoElement>(this.postVideoRef.nativeElement)).load(); 
         }
        // console.log('playing video time',(<HTMLVideoElement>(this.postVideoRef.nativeElement)).currentTime);
      }
    });
    this.getPostLikes();
  }
  navigateToProfile() {
  this.globalEmitterService.setCurrentProfileObj(this.postDetails.profileName);
  this.route.navigate(['/profile',this.postDetails.profileid]);
  }

ngAfterViewInit(){
  // if(this.postDetails.postVideos.length>0){
  //   (<HTMLVideoElement>(this.postVideoRef.nativeElement)).addEventListener('play', (event) => {
  //     console.log('playing video');
  //     this.groupVideoPauseService.emitcurrentplayingVideoId(this.postDetails.id);
  //   });
  // }
  
}

ngOnDestroy(){
  this.videoPlaySubscription.unsubscribe(); 
}
  updateLikeStatus() {
    let body={
      "postid":this.postDetails.id,
      "groupid": this.postDetails.groupid,
      "profileid": this.loggedInUserId
    }
    if(!this.likeStatus){
    let endPoint = `post/like`;
      this.userPostsService.likePost(endPoint,body).subscribe(resp=>{
        this.likeStatus = true;
        this.getPostLikes('latest');
      });
    } else if(this.likeStatus){
      let endPoint = `post/like`; 
      this.userPostsService.revertLike(endPoint, body).subscribe(resp=>{
        this.likeStatus = false; 
        let index = this.postLikesProfiles.findIndex(profile=>{
        return profile.profileId == this.loggedInUserId;
      });
      if(index >=0){
        this.postLikesProfiles.splice(index,1);
      }
      });
    }
    
    // this.likeStatus = ! this.likeStatus;

    // if(this.likeStatus){
    //   this.postLikesProfiles.push(likedProfileObj)
    // } else {
    //  let index = this.postLikesProfiles.findIndex(likeObj=>{
    //     return likeObj.profileName == 'raju';
    //   });
    //   this.postLikesProfiles.splice(index,1);
    // }
    
  }

commentFocus(){
  //  this.getPostComments();
    this.commentsExpanded = !this.commentsExpanded;
    this.showComments = true;
    setTimeout(()=>{
      this.focusInput = !this.focusInput;
    },300); 
}

getPostLikes(state?){
 let endPoint = `post/${this.postDetails.id}/likes?groupid=${this.postDetails.groupid}&pageNumber=${this.likesPageNumber}&pageSize=10`; 
if(state == 'latest'){
  endPoint = `post/${this.postDetails.id}/likes?groupid=${this.postDetails.groupid}&pageNumber=1&pageSize=100`; 
}
 this.userPostsService.getPostLikes(endPoint).subscribe((resp:Array<IprofileDetails>)=>{
   if(resp && Array.isArray(resp) && resp.length > 0){
   resp.forEach(profile=>{
     if(profile.profileId == this.loggedInUserId){
       this.likeStatus = true;
     }
   });
   if(state && state =='latest'){
    const results = resp.filter(({ profileId: profileId1 }) => !this.postLikesProfiles.some(({ profileId: profileId2 }) => profileId2 == profileId1));
    this.postLikesProfiles = [...this.postLikesProfiles, ...results];
   } else {
    this.postLikesProfiles = [...this.postLikesProfiles, ...resp];
    this.likesPageNumber = this.likesPageNumber+1;
    this.getPostLikes();
   }
   } else if(resp && Array.isArray(resp) && resp.length == 0){

   }
 });
}

  getHeight():number {
    return 400;
  }

  sharePost(postDetails:any){
    let obj = Object.assign({},postDetails);
    obj.postCategory = 'share';
    obj.postedUserName = 'Siva Ramu'
    this.userPostsService.addUserPost(obj);
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'shared to your timeline'})
  }
  resetVideo(){
    // if(this.postDetails.postVideos.length>0){
    //    this.postVideoRef.nativeElement.load();
    // }
  }

}
