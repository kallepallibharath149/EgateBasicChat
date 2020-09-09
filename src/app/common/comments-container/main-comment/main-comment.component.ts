import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main-comment',
  templateUrl: './main-comment.component.html',
  styleUrls: ['./main-comment.component.less']
})
export class MainCommentComponent implements OnInit, AfterViewInit {
  replayComment: string = '';
  @ViewChild('replyCommentInput', {read:ElementRef,  static: true }) replyCommentInput: ElementRef;
  @ViewChild('replyCommentImageInput') replyCommentImageInput: ElementRef;
  @Input('mainCommentObj') mainCommentObj: any = null;
  @Input('userDetails') userDetails : any;
  tempReplyCommentImage: any;
  showReplyPost: boolean = false;
  viewInitialized: boolean = false;

  @Output() updateReplyCommentArray = <any>new EventEmitter();

  constructor(private router: Router,
              public domSanitizationService: DomSanitizer,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
  }

  navigateToProfile() {
    this.router.navigate(['/profile', this.userDetails.profileId]);
  }

  newReplyCommentHandler(commentForm: NgForm) {
    let replyPostCommentObj: any = {
      profileName: 'Raghu',
      profilePhoto: '',
      profileId: '',
      commentType: 'text',
      commentText: '',
      commentFileUrl: '',
      commentReplayArray: [],
    }
    if (this.tempReplyCommentImage) {
      replyPostCommentObj.commentFileUrl = this.tempReplyCommentImage;
    }
    if (this.replayComment && this.replayComment.length > 0) {
      replyPostCommentObj.commentText = this.replayComment;
    }
    if (this.replayComment && this.replayComment.length > 0 || this.tempReplyCommentImage) {
     // this.mainCommentObj.commentReplayArray.push(replyPostCommentObj);
      let obj = {
        "updatedObj": this.mainCommentObj,
        "addedreplyPostObj": replyPostCommentObj
      }
      this.updateReplyCommentArray.emit(obj);
      // this._showComments = true;
      commentForm.reset();
      this.resetFields();
    }
  }

  resetFields() {
    this.tempReplyCommentImage = null;
  }


  replyCommentPhotoUpload() {
    this.replyCommentImageInput.nativeElement.click();
    this.replyCommentInput.nativeElement.focus();
  }

  handleReplyCommentPhotoUpload(event) {
    let uploadedImg;
    let imgUrl;
    if (event.target.files.length > 0) {
      uploadedImg = event.target.files[0];
      imgUrl = URL.createObjectURL(uploadedImg);
      this.tempReplyCommentImage = this.domSanitizationService.bypassSecurityTrustUrl(imgUrl);
    }
  }

  discardTempororyImg() {
    this.tempReplyCommentImage = null;
  }

  replyToComment() {
    this.showReplyPost = true;
    this.cd.detectChanges();
    this.replyCommentFocus();
  }

  replyCommentFocus() {
    setTimeout(()=>{
      if (this.viewInitialized && this.showReplyPost) {
        this.replyCommentInput.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        this.replyCommentInput.nativeElement.focus();
      }
    },300);

  }


}
