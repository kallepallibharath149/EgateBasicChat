import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
import { comment, post } from '../models/posts.model';


@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.less']
})
export class CommentsContainerComponent implements OnInit, AfterViewInit {
  initialComentsCheck:boolean = false;
  showSpinner:boolean = false;
  pageNumber:number = 1;
  showLoadMore: boolean = false;
  viewInitialized: boolean = false;
  postComment: string = '';
  replyPostComment: string = '';
  @Input() commentsArray: Array<comment> = [];
  @Input('postDetails') postDetails: post;
  _showComments: boolean = false;
  showCommentsContainer : boolean = true;
  @Input('userDetails') userDetails : any;

  @Input('commentsExpanded') set commentsExpanded(commentsExpanded: boolean) {
   if(commentsExpanded && !this.initialComentsCheck){
    this.initialComentsCheck = true;
     this.getPostComments();
   }
  }

  @Input('showComments') set showComments(showComments: boolean) {
    if (showComments) {
      this._showComments = true;
      this.showCommentsContainer = true;
    } else {
      if (this.viewInitialized) {
        this._showComments = false;
        this.showCommentsContainer = false;
        // this.currentReplyIndex = null;
      }
    }
  };
  @Input('focusInput') set focusInput(focusInput: any) {
    this.currentReplyIndex = null;
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
  currentReplyIndex:number;

  constructor(public domSanitizationService: DomSanitizer,
              private router: Router,
              private userPostsService : UserPostsService) { }

  ngOnInit(): void {
    // this.getPostComments();
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
      commentText: '',
      commentFileUrl: '',
    }
    if (this.tempCommentImage) {
      postCommentObj.commentFileUrl = this.tempCommentImage;
    }
    if (this.postComment && this.postComment.length > 0) {
      postCommentObj.commentText = this.postComment;
    }
    if (this.postComment && this.postComment.length > 0 || this.tempCommentImage) {
    //  this.commentsArray.push(postCommentObj);
      // let obj = {
      //   "updatedArray": this.commentsArray,
      //   "addedPostObj": postCommentObj,
      //   "formFiles"   : this.selectedCommentFiles
      // }
      // this.updateCommentArray.emit(obj);
      // this._showComments = true;
      this.updateComments(postCommentObj.commentText, this.selectedCommentFiles)
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


  navigateToProfile() {
    this.router.navigate(['/profile', this.userDetails.profileId]);
  }

  getPostComments(state?){
    let endPoint = `post/comments?postID=${this.postDetails.id}&pageNumber=${this.pageNumber}&pageSize=10`;
    if(state == 'latestComments'){
      endPoint = `post/comments?postID=${this.postDetails.id}&pageNumber=1&pageSize=100`; 
    }
    this.showSpinner = true;
    this.userPostsService.getPostComments(endPoint).subscribe(resp=>{
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

       if(state == 'latestComments'){
        const results = resp.filter(({ id: id1 }) => !this.commentsArray.some(({ id: id2 }) => id2 === id1));
        this.commentsArray = [...results, ...this.commentsArray];
       }else if(state != 'latestComments'){
        this.commentsArray = [...this.commentsArray, ...resp];
       } 
    });
  }

  updateComments(commentText, commentAttachedFiles?){
    let body: FormData = new FormData();
    let postData = {
     "postid": this.postDetails.id,
     "groupid": this.postDetails.groupid,
     "commenttext": commentText
   }
   
   if (commentAttachedFiles) {
     body.append('Files', commentAttachedFiles);
   }
   body.append('PostData', JSON.stringify(postData));
   let endPoint = `post/comment`
   this.userPostsService.addCommentToPost(endPoint,body).subscribe(resp =>{
     console.log(resp);
   this.getPostComments('latestComments');
   });
   //  this.commentsArray.push(addedcommentObj);
   
   }

  loadMoreComments(){
    this.pageNumber = this.pageNumber+1;
    this.getPostComments();
  }

}
