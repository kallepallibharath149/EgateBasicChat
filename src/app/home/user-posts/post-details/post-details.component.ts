import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UserPostsService } from '../user-post-service/user-posts-service';
import {MessageService} from 'primeng/api';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.less']
})
export class PostDetailsComponent implements OnInit {
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

  @Input('postDetails') postDetails : any;
  @Input('userDetails') userDetails : any;
  


  constructor(private route: Router,
              public domSanitizationService: DomSanitizer,
              private userPostsService : UserPostsService,
              public messageService: MessageService,
              private globalEmitterService: GlobalEmittingEventsService) { }

  ngOnInit(): void {
  }
  navigateToProfile() {
  this.globalEmitterService.setCurrentProfileObj(this.postDetails.userName);
  this.route.navigate(['/profile',this.postDetails.profileId]);
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

}
