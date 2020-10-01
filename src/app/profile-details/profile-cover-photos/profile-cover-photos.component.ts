import { Component, OnInit, Input, ViewChild, NgZone, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPostsService } from '../../home/user-posts/user-post-service/user-posts-service';
import { HttpService } from '@app/interceptors/http.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-profile-cover-photos',
  templateUrl: './profile-cover-photos.component.html',
  styleUrls: ['./profile-cover-photos.component.less']
})
export class ProfileCoverPhotosComponent implements OnInit {

  //  @Input('coverPhoto') coverPhoto = '../../assets/images/profile.jpg';
  //  @Input('profilePhoto') profilePhoto = '../../assets/images/profile.jpg';
  userDetails: any = null;
  isMyprofile: boolean = false;
  @Output('profileDetails') profileDetails = new EventEmitter<any>()
  @Input('coverPhoto') coverPhoto = ' ';
  @Input('profilePhoto') profilePhoto = ' ';
  currentProfileId: string = null;
  proFileDetailsresponseObj: any;
  selectedPhotoUrl: any;
  profileDetailsResponse: boolean = false;

  @ViewChild('confirmImageTemplate') confirmImageTemplate;
  modalReference: any;
  closeResult = '';
  imageSrc: any;
  header: string = null;

  constructor(public domSanitizationService: DomSanitizer,
    private zone: NgZone,
    private ref: ChangeDetectorRef,
    private modalService?: NgbModal,
    private userPostsService?: UserPostsService,
    private httpService?: HttpService,
    private activatedRoute?: ActivatedRoute,
    private globalEmitterService?: GlobalEmittingEventsService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.has('id')); // true has() ,get(),      getAll()
      console.log(params.get('id'));
      this.currentProfileId = params.get('id');
      let loggedIndetails = this.globalEmitterService.getLoggedInUserDetails();
      if (this.userDetails && this.currentProfileId == this.userDetails.profileId) {
        this.isMyprofile = true;
      } else if (this.userDetails && this.currentProfileId != this.userDetails.profileId) {
        this.isMyprofile = false;
      }
      this.profileDetailsResponse = false;
      this.getProfileDetails();
    });
    this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails) => {
      if (userDetails != false) {
        this.userDetails = userDetails;
        if (this.currentProfileId == this.userDetails.profileId) {
          this.isMyprofile = true;
        } else if (this.currentProfileId != this.userDetails.profileId) {
          this.isMyprofile = false;
        }
      }
    });
  }


  getProfileDetails() {
    this.httpService.httpGet('User/111/ProfileDetails').subscribe((response) => {
      console.log(response);
      if(response){
        this.profileDetailsResponse = true;
        this.profilePhoto = response.profileImageUrl;
        this.coverPhoto = response.profileCoverImageUrl;
        this.proFileDetailsresponseObj = response;
        this.profileDetails.emit(response);
      }
    }, (error) => {
      console.log(error);
    })
  }

  coverPhotoUpload() {
    $("#cover-photo-upload").click();
  }

  profilePhotoUpload() {
    $("#profile-photo-upload").click();
  }

  handlePhotoUpload(event, photoType) {
    let selectedFile: any;
    if (photoType == 'coverPhoto') {
      selectedFile = document.getElementById('cover-photo-upload');
      this.header = 'Cover Photo';
    } else if (photoType == 'profilePhoto') {
      selectedFile = document.getElementById('profile-photo-upload');
      this.header = 'Profile Photo';
    }
    let dataa = <File>selectedFile.files[0];
    this.selectedPhotoUrl = URL.createObjectURL(dataa);
    // formData.append('myFile', dataa);
    // formData.append('myfilename',dataa.name);
    // const blob = URL.createObjectURL(this.selectedImage);

    this.imageSrc = this.domSanitizationService.bypassSecurityTrustUrl(this.selectedPhotoUrl);
    this.openModal(this.confirmImageTemplate);
  }

  openModal(content) {
    this.modalReference = this.modalService.open(this.confirmImageTemplate, { ariaLabelledBy: 'modal-basic-title', centered: true });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.imageSrc = null;
      this.header = null;
    });
  }

  closeModal(modal) {
    this.modalReference.close();
    this.imageSrc = null;
    this.selectedPhotoUrl = null;
    this.header = null;
  }

  updatePhoto() {
    let postObject = {
      imagePost: false,
      imageVideoUrl: null
    };
    postObject.imagePost = true;
    postObject.imageVideoUrl = this.imageSrc;
    this.userPostsService.addUserPost(postObject);
    if (this.header == 'Cover Photo') {
      this.coverPhoto = this.selectedPhotoUrl;
    } else if (this.header == 'Profile Photo') {
      this.profilePhoto = this.selectedPhotoUrl;
    }
    this.ref.detectChanges();
    // this.zone.run(() => this.profilePhoto = this.selectedPhotoUrl)
    this.closeModal('');
  }

}
