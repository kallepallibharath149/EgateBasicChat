import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { UserPostsService } from '../user-posts/user-post-service/user-posts-service';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '@app/groups/groups.service';
import { ngxLoadingAnimationTypes ,NgxLoadingComponent} from '../../common/ngx-loader/lib/public_api';
import { groupPostReloadService } from '@app/main-page-groups-container/groupPost.reload';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.less']
})
export class PostUploadComponent implements OnInit {
  currentGroupId:string = '';
  closeResult = '';
  selectedImage : any ;
  selectedImageFile:any;
  selectedVideoFile:any;
  imageSrc : any ;
  videoSrc : any;
  modalReference : any ;
  postText : any = '';
  @ViewChild ('content') content ;
  @ViewChild ('textPost') textPost;
  showLoading:boolean = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes.threeBounce;
  
  constructor(private modalService: NgbModal,
             private sanitizer : DomSanitizer,
             private userPostsService : UserPostsService,
             private activatedRoute: ActivatedRoute,
             private groupService: GroupsService,
             private groupReloadService:groupPostReloadService,
             private messageService: MessageService
                 ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.has('id')); // true has() ,get(),      getAll()
      this.currentGroupId = params.get('groupId');
    });
  }

  open(content) {
   this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true});
   this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.videoSrc =null; 
      this.imageSrc = null;
      this.postText = null;
    });
  }

  handleFilesImages(data){
    const selectedFile:any = document.getElementById('imageInput');
    let dataa=<File>selectedFile.files[0];
    this.selectedImageFile = dataa;
    this.selectedImage =URL.createObjectURL(dataa);
    this.imageSrc  = this.sanitizer.bypassSecurityTrustUrl(this.selectedImage);
    this.open(this.content);
  }

  handleFilesVideo(data){
    const selectedFile:any = document.getElementById('videoInput');
    let dataa=<File>selectedFile.files[0];
    this.selectedVideoFile = dataa;
    let videosrcdata = window.URL.createObjectURL(dataa);
    this.videoSrc =this.sanitizer.bypassSecurityTrustUrl(videosrcdata);
    this.open(this.content);
  }

  closeModal(modal){
  this.modalReference.close();
  this.videoSrc =null; 
  this.imageSrc = null;
  this.postText = '';
  this.selectedVideoFile = null;
  this.selectedVideoFile  = null;
  }
  PostUserStory(modal,imageSrc,videoSrc){
    let postObject={
      imagePost: false,
      videoPost: false,
      imageVideoUrl:null,
      postComment: this.postText
    };
    if(imageSrc){
      postObject.imagePost = true;
      postObject.imageVideoUrl = this.imageSrc;
    } else if(videoSrc){
      postObject.videoPost = true;
      postObject.imageVideoUrl = this.videoSrc;
    }
    let body:FormData = new FormData();
    let postData = {
       "profileid":"ed27ac86-2aa8-4341-9b92-1b162b0420d7",
       "groupid": this.currentGroupId,
       "posttext": this.postText
    }

    if(imageSrc){
      body.append('files',  this.selectedImageFile);
    } else if(videoSrc){
      body.append('files', this.selectedVideoFile);
    } else{
     // body.append('files',  null);
    }
    body.append('PostData', JSON.stringify(postData));
    let endPoint = `Post`
    // this.http.post(url, body);
    this.showLoading = true;
   this.groupService.postToGroup(endPoint,body).subscribe(resp=>{
    this.showLoading = false;
    this.groupReloadService.reloadGroupPost(true);
    console.log('uppload file success response', resp);
   },(error)=>{
    this.showLoading = false;
    this.messageService.add({severity:'error', summary: 'Error Message', detail:error.message});
   });
  this.closeModal('');
  }
  

}
