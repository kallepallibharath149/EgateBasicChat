import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UserPostsService } from '../user-post-service/user-posts-service';
import {MessageService} from 'primeng/api';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';
import { post } from '@app/common/models/posts.model';
import { GroupVideoPauseService } from '@app/services/group.video.pause.service';
import { Subscription } from 'rxjs';

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
  commentsArray : Array<any> = [];
  likesArray : Array<any> = [{
    profileId: '',
    profileName: 'satya',
    profileImageUrl:'',
  },
  {
    profileId: '',
    profileName: 'raju',
    profileImageUrl:'',
  }];
  videoPlaySubscription:Subscription;
  @ViewChild('postVideoRef',{ static: false }) postVideoRef: ElementRef; 

  @Input('postDetails') postDetails : post;
  @Input('userDetails') userDetails : any;
  


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
    })
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
    this.likeStatus = ! this.likeStatus;
    let likedProfileObj = {
      profileId: '',
      profileName: 'raju',
      profileImageUrl:'',
    }

    if(this.likeStatus){
      this.likesArray.push(likedProfileObj)
    } else {
     let index = this.likesArray.findIndex(likeObj=>{
        return likeObj.profileName == 'raju';
      });
      this.likesArray.splice(index,1);
    }
    
  }

commentFocus(){
this.showComments = true;
this.focusInput = !this.focusInput;
}

updateCommentArray(updatedArray, addedcommentObj){
this.showComments = true;
 this.commentsArray.push(addedcommentObj);
}

updateCommentArrayForReply(updatedObj, addedreplyPostObj,index){
 let repliedObj = this.commentsArray[index];
 repliedObj.commentReplayArray.push(addedreplyPostObj);
 this.commentsArray.splice(index,1,repliedObj);
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
