import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverLayComponentComponent } from '../../common/over-lay-component/over-lay-component.component';
import { HttpService } from '@app/interceptors/http.service';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.less']
})
export class VideosComponent implements OnInit {
  //OverLayComponentComponent:OverLayComponentComponent;
  modalReference : any ;
  closeResult = '';
  currentProfileId:any = 'raju';
  currentOverlayObj:any = null;
  userDetails:any = null;
  @ViewChild ('overlayRef') overlayRef:TemplateRef<any> ;
  videosArray: Array<any> = [
    // {
    //   "videoSrc": "../../assets/images/profile.jpg",
    //   "videoUrl" :"../../assets/video/samplevideo.mp4" 
    //  },
  ]

  constructor(private activatedRoute: ActivatedRoute,
              private modalService?: NgbModal,
              private httpService?:HttpService,
              private globalEmitterService?: GlobalEmittingEventsService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.has('id')); // true has() ,get(),      getAll()
      console.log(params.get('id'));
      this.currentProfileId = params.get('id');
      this.getVideos();
    });
    this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails)=>{
      if(userDetails != false){
        this.userDetails = userDetails;
      }
    });
  }

  openModal(video) {
    this.currentOverlayObj = video;
    this.modalReference = this.modalService.open(this.overlayRef, {ariaLabelledBy: 'modal-basic-title',centered: true});
   // this.modalReference.componentInstance.videoUrl = video.videoUrl; 
    this.modalReference.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
       this.currentOverlayObj = null;
     }, (reason) => {
      this.currentOverlayObj = null;
     });
   }

  openVideo(video){

  }

  getVideos(){
    this.httpService.httpGet('User/111/Videos').subscribe((response)=>{
      console.log(response);
      if(Array.isArray(response) && response.length > 0){
        this.videosArray = [];
         response.forEach(video=>{
          let videoDetails:any = {};
          videoDetails.videoSrc = video.coverPhotoUrl;
          videoDetails.videoUrl = 'https://www.w3schools.com/tags/movie.ogg';
          this.videosArray.push(videoDetails);
        })
      }
     },(error)=>{
       console.log(error);
     })
  }
}
