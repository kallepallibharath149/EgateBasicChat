import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { UserPostsService } from '../user-posts/user-post-service/user-posts-service';

@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.less']
})
export class PostUploadComponent implements OnInit {
  closeResult = '';
  selectedImage : any ;
  imageSrc : any ;
  videoSrc : any;
  modalReference : any ;
  postComment : any = '';
  @ViewChild ('content') content ;
  
  constructor(private modalService: NgbModal,
             private sanitizer : DomSanitizer,
             private userPostsService : UserPostsService
                 ) { }

  ngOnInit(): void {
  }

  open(content) {
   this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true});
   this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.videoSrc =null; 
      this.imageSrc = null;
    });
  }

  handleFilesImages(data){
    const selectedFile:any = document.getElementById('imageInput');
    let dataa=<File>selectedFile.files[0];
    // const formData:any = new FormData();
    // let image:any = document.getElementById('outputImage');
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
  this.postComment = '';
  }
  PostUserStory(modal,imageSrc,videoSrc){
    let postObject={
      imagePost: false,
      videoPost: false,
      imageVideoUrl:null,
      postComment: this.postComment
    };
    if(imageSrc){
      postObject.imagePost = true;
      postObject.imageVideoUrl = this.imageSrc;
    } else if(videoSrc){
      postObject.videoPost = true;
      postObject.imageVideoUrl = this.videoSrc;
    }
  this.userPostsService.addUserPost(postObject);
  this.closeModal('');
  }
  

}
