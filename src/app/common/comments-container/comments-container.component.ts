import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { comment } from '../models/posts.model';


@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.less']
})
export class CommentsContainerComponent implements OnInit, AfterViewInit {

  viewInitialized: boolean = false;
  postComment: string = '';
  replyPostComment: string = '';
  @Input() commentsArray: Array<comment> = [];
  @Input('postDetails') postDetails: any;
  _showComments: boolean = false;
  showCommentsContainer : boolean = true;
  @Input('userDetails') userDetails : any;
  @Input('showComments') set showComments(showComments: boolean) {
    if (showComments) {
      this._showComments = true;
      this.showCommentsContainer = true;
    } else {
      if (this.viewInitialized) {
        this._showComments = false;
        this.showCommentsContainer = false;
      }
    }
  };
  @Input('focusInput') set focusInput(focusInput: any) {
    this.commentFocus();
    this._showComments = true;
    this.showCommentsContainer = true;
  };
  @ViewChild('commentInput') commentInput: ElementRef;
  @ViewChild('commentImageInput') commentImageInput: ElementRef;
  tempCommentImage: any;
  tempReplayCommentImage: any;

  @Output() updateCommentArray = <any>new EventEmitter();
  @Output() updateCommentArrayForReply = <any>new EventEmitter();
  selectedCommentFiles:any;

  constructor(public domSanitizationService: DomSanitizer,
              private router: Router,) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
  }
  commentFocus() {
    if (this.viewInitialized) {
      this.commentInput.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      this.commentInput.nativeElement.focus();
    }
  }

  newCommentHandler(commentForm: NgForm) {
    let postCommentObj: any = {
      profileName: 'Raghu',
      profilePhoto: '',
      profileId:'',
      commentType: 'text',
      commentText: '',
      commentFileUrl: '',
      commentReplayArray: [],
    }
    if (this.tempCommentImage) {
      postCommentObj.commentFileUrl = this.tempCommentImage;
    }
    if (this.postComment && this.postComment.length > 0) {
      postCommentObj.commentText = this.postComment;
    }
    if (this.postComment && this.postComment.length > 0 || this.tempCommentImage) {
     // this.commentsArray.push(postCommentObj);
      let obj = {
        "updatedArray": this.commentsArray,
        "addedPostObj": postCommentObj,
        "formFiles"   : this.selectedCommentFiles
      }
      this.updateCommentArray.emit(obj);
      // this._showComments = true;
      commentForm.reset();
      this.resetFields();
    }
  }

  resetFields() {
    this.tempCommentImage = null;
  }

  commentPhotoUpload() {
    this.commentImageInput.nativeElement.click();
    this.commentInput.nativeElement.focus();
  }

  handleCommentPhotoUpload(event) {
    let uploadedImg;
    let imgUrl;
    if (event.target.files.length > 0) {
      uploadedImg = event.target.files[0];
      this.selectedCommentFiles = uploadedImg;
      imgUrl = URL.createObjectURL(uploadedImg);
      this.tempCommentImage = this.domSanitizationService.bypassSecurityTrustUrl(imgUrl);
    }
  }

  discardTempororyImg() {
    this.tempCommentImage = null;
    this.selectedCommentFiles = null;
  }

  updateMainArray(updatedCommentObj,addedreplyPostObj,index){
    let details = {
      updatedObj: updatedCommentObj,
      addedreplyPostObj: addedreplyPostObj,
      index : index
    }
  this.updateCommentArrayForReply.emit(details);
  }

  navigateToProfile() {
    this.router.navigate(['/profile', this.userDetails.profileId]);
  }

}
