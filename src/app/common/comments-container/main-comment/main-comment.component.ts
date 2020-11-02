import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { comment } from '@app/common/models/posts.model';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';

@Component({
  selector: 'app-main-comment',
  templateUrl: './main-comment.component.html',
  styleUrls: ['./main-comment.component.less']
})
export class MainCommentComponent implements OnInit, AfterViewInit {
  replayComment: string = '';
  pageNumber:number = 1;
  showSpinner:boolean = false;
  showLoadMore:boolean = false;
  showReplies:boolean = false;
  initialRepliesCheck:boolean = false;
  noReplies: boolean = false;
  @ViewChild('replyCommentInput', {read:ElementRef,  static: true }) replyCommentInput: ElementRef;
  @ViewChild('replyCommentImageInput') replyCommentImageInput: ElementRef;
  @Input('mainCommentObj') mainCommentObj: comment = null;
  @Input() commentsReplyArray: Array<comment> = [];
  @Input('commentIndex') commentIndex: number;
  @Input('userDetails') userDetails : any;
  @Input('currentReplyIndex') currentReplyIndex : any;
  tempReplyCommentImage: any;
  selectedCommentReplyFiles:any;
  showReplyPost: boolean = false;
  viewInitialized: boolean = false;
  @Output() replyClickedMaincomment = new EventEmitter();

  @Output('updateReplyCommentArray') updateReplyCommentArray =  new EventEmitter();

  constructor(private router: Router,
              public domSanitizationService: DomSanitizer,
              private cd: ChangeDetectorRef,
              private userPostsService : UserPostsService) { }

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
      // this.updateReplyCommentArray.emit(obj);
      // this._showComments = true;
      this.addNewCommentReply(this.replayComment, this.selectedCommentReplyFiles)
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
      this.selectedCommentReplyFiles = uploadedImg;
      imgUrl = URL.createObjectURL(uploadedImg);
      this.tempReplyCommentImage = this.domSanitizationService.bypassSecurityTrustUrl(imgUrl);
    }
  }

  discardTempororyImg() {
    this.tempReplyCommentImage = null;
  }

  replyToComment(eventFrom?) {
    this.showReplyPost = true;
    this.showReplies = true;
    this.cd.detectChanges();
    if(eventFrom != 'showHide' || !this.noReplies){
      this.replyClickedMaincomment.emit(this.commentIndex);
      this.replyCommentFocus();
    }
    if(!this.initialRepliesCheck){
      this.initialRepliesCheck = true;
      this.getCommentsReply();
    }
  }

  showHideReply(){
    if(this.showReplies){
      this.showReplies = false;
    } else {
      this.showReplies = true;
      this.replyToComment('showHide');
    }
  }
  

 addNewCommentReply(commentText, commentAttachedFiles?){
  let body: FormData = new FormData();
  let postData = {
   "commentid": this.mainCommentObj.id,
   "commenttext": commentText
 }
 
 if (commentAttachedFiles) {
   body.append('Files', commentAttachedFiles);
 }
 body.append('PostData', JSON.stringify(postData));
 let endPoint = `post/comment2`
 this.userPostsService.addCommentToPost(endPoint,body).subscribe(resp =>{
   console.log(resp);
   this.getCommentsReply('latestReplied');
 });
 //  this.commentsArray.push(addedcommentObj);
 
 }

 getCommentsReply(state?){
  let endPoint = `post/comment2?commentid=${this.mainCommentObj.id}&pageNumber=${this.pageNumber}&pageSize=10`;
  if(state == 'latestReplied'){
    endPoint = `post/comment2?commentid=${this.mainCommentObj.id}&pageNumber=1&pageSize=100`;   
  }
  this.showSpinner = true;
  this.userPostsService.getRepliesToComments(endPoint).subscribe(resp=>{
     this.showSpinner = false;
     if(resp && Array.isArray(resp) && resp.length >0){
      resp.forEach((comment:comment)=>{
        comment.profileImageUrl = `http://3.230.104.70:8888/api/${comment.profileImageUrl}`; 
        comment.resources.forEach((resourse,i)=>{
          if(resourse.fileType && resourse.fileType.toLowerCase() == 'image'){
            resourse.url = `http://3.230.104.70:8888/api/${resourse.url}`;
          }
        });
      if(comment.resources.length <=0 ){
        comment.commentTextOnly = true;
      } else {
        comment.commentTextOnly = false; 
      }
      });
      this.showLoadMore = true;
     } else if (resp && Array.isArray(resp) && resp.length ==0){
      this.showLoadMore = false;
     }
     if(state == 'latestReplied'){
      const results = resp.filter(({ id: id1 }) => !this.commentsReplyArray.some(({ id: id2 }) => id2 === id1));
      this.commentsReplyArray = [...results,...this.commentsReplyArray];
     } else if(state != 'latestReplied'){
      this.commentsReplyArray = [...this.commentsReplyArray, ...resp];
     }
      if(this.commentsReplyArray.length <=0){
        this.noReplies = true;
      }
  });
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

  loadMoreCommentsReplies(){
    this.pageNumber = this.pageNumber+1;
    this.getCommentsReply();
  }

  showVal(){
    console.log('value', this.commentIndex);
    console.log('value', this.showReplyPost);
    console.log('value', this.currentReplyIndex);

  }


}
