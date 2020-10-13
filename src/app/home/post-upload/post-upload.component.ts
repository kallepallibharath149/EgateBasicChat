import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { UserPostsService } from '../user-posts/user-post-service/user-posts-service';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '@app/groups/groups.service';

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
  
  constructor(private modalService: NgbModal,
             private sanitizer : DomSanitizer,
             private userPostsService : UserPostsService,
             private activatedRoute: ActivatedRoute,
             private groupService: GroupsService
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
    });
  }

  handleFilesImages(data){
    const selectedFile:any = document.getElementById('imageInput');
    let dataa=<File>selectedFile.files[0];
    // const formData:any = new FormData();
    // let image:any = document.getElementById('outputImage');
    this.selectedImageFile = dataa;
    this.selectedImage =URL.createObjectURL(dataa);
    // formData.append('myFile', dataa);
    // formData.append('myfilename',dataa.name);
    // const blob = URL.createObjectURL(this.selectedImage);

    this.imageSrc  = this.sanitizer.bypassSecurityTrustUrl(this.selectedImage);
    this.open(this.content);
  }

  handleFilesVideo(data){
    const selectedFile:any = document.getElementById('videoInput');
    let dataa=<File>selectedFile.files[0];
    // const formData:any = new FormData();
    // let video:any = document.getElementById('outputVideo');
    this.selectedVideoFile = dataa;
    let videosrcdata = window.URL.createObjectURL(dataa);
    //window.URL.createObjectURL(videosrcdata.data);
    this.videoSrc =this.sanitizer.bypassSecurityTrustUrl(videosrcdata);
    this.open(this.content);
    // console.log(videosrcdata);
    // console.log(this.videoSrc);
    // formData.append('myFile', dataa);
    // formData.append('myfilename',dataa.name)
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
    }
    body.append('PostData', JSON.stringify(postData));
    let endPoint = `Post`
    // this.http.post(url, body);
   this.groupService.postToGroup(endPoint,body).subscribe(resp=>{
    console.log('uppload file success response', resp);
   });
  this.userPostsService.addUserPost(postObject);
  this.closeModal('');
  }
  

}
