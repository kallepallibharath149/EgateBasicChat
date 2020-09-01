import { Component, OnInit, Input, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPostsService } from '../../home/user-posts/user-post-service/user-posts-service';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-profile-cover-photos',
  templateUrl: './profile-cover-photos.component.html',
  styleUrls: ['./profile-cover-photos.component.less']
})
export class ProfileCoverPhotosComponent implements OnInit {

//  @Input('coverPhoto') coverPhoto = '../../assets/images/profile.jpg';
//  @Input('profilePhoto') profilePhoto = '../../assets/images/profile.jpg';
@Input('coverPhoto') coverPhoto = '';
@Input('profilePhoto') profilePhoto = '';
proFileDetailsresponseObj: any ;
 selectedPhotoUrl : any ;

 @ViewChild ('confirmImageTemplate') confirmImageTemplate ;
 modalReference : any ;
 closeResult = '';
 imageSrc : any ;
 header: string = null;

  constructor( public domSanitizationService: DomSanitizer, 
               private zone: NgZone,
               private ref: ChangeDetectorRef , 
               private modalService?: NgbModal,
               private userPostsService? : UserPostsService,
               private httpService?:HttpService
               
              ) { }

  ngOnInit(): void {
  this.getProfileDetails();
  }


  getProfileDetails(){
    this.httpService.httpGet('ProfileDetails').subscribe((response)=>{
      console.log(response);
      this.profilePhoto = response.profileImageUrl;
      this.coverPhoto = response.profileCoverImageUrl;
      this.proFileDetailsresponseObj = response;
     },(error)=>{
       console.log(error);
     })
  }

  getProfileCoverPhoto(){
   return this.domSanitizationService.bypassSecurityTrustUrl( this.coverPhoto );
  }

  getProfilePhoto(){
    return this.domSanitizationService.bypassSecurityTrustUrl(this.profilePhoto);
   }

   coverPhotoUpload(){
      $("#cover-photo-upload").click();
   }

   profilePhotoUpload(){
    $("#profile-photo-upload").click();
   }

   handlePhotoUpload(event , photoType){
    let selectedFile : any;
     if(photoType == 'coverPhoto'){
      selectedFile = document.getElementById('cover-photo-upload');
      this.header = 'Cover Photo';
     } else if (photoType == 'profilePhoto'){
      selectedFile = document.getElementById('profile-photo-upload');
      this.header = 'Profile Photo';
     }
    let dataa=<File>selectedFile.files[0];
    this.selectedPhotoUrl = URL.createObjectURL(dataa);
    // formData.append('myFile', dataa);
    // formData.append('myfilename',dataa.name);
    // const blob = URL.createObjectURL(this.selectedImage);

     this.imageSrc  = this.domSanitizationService.bypassSecurityTrustUrl(this.selectedPhotoUrl);
     this.openModal(this.confirmImageTemplate);
   }

   openModal(content) {
    this.modalReference = this.modalService.open(this.confirmImageTemplate, {ariaLabelledBy: 'modal-basic-title',centered: true});
    this.modalReference.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.imageSrc = null;
      this.header = null;
     });
   }

   closeModal(modal){
    this.modalReference.close();
    this.imageSrc = null;
    this.selectedPhotoUrl = null;
    this.header = null;
    }

   updatePhoto(){
    let postObject={
      imagePost: false,
      imageVideoUrl: null
     };
      postObject.imagePost = true;
      postObject.imageVideoUrl = this.imageSrc;
      this.userPostsService.addUserPost(postObject);
      if(this.header == 'Cover Photo'){
        this.coverPhoto = this.selectedPhotoUrl;
      } else if(this.header == 'Profile Photo'){
        this.profilePhoto = this.selectedPhotoUrl;
      }
      this.ref.detectChanges();
      // this.zone.run(() => this.profilePhoto = this.selectedPhotoUrl)
      this.closeModal('');
   }

}
