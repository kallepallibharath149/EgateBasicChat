import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverLayComponentComponent } from '../../common/over-lay-component/over-lay-component.component';
import { HttpService } from '@app/interceptors/http.service';

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
  videosArray: Array<any> = [
    {
      "videoSrc": "../../assets/images/profile.jpg",
      "videoUrl" :"../../assets/video/samplevideo.mp4" 
     },
  ]

  constructor(private activatedRoute: ActivatedRoute,
              private modalService?: NgbModal,
              private httpService?:HttpService) { }

  ngOnInit(): void {
    this.getFriendsList();
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.has('id')); // true has() ,get(),      getAll()
      console.log(params.get('id'));
      this.currentProfileId = params.get('id');
    });
  }

  openModal(video) {
    this.modalReference = this.modalService.open(OverLayComponentComponent, {ariaLabelledBy: 'modal-basic-title',centered: true});
    this.modalReference.componentInstance.videoUrl = video.videoUrl; 
    this.modalReference.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
     
     });
   }

  openVideo(video){

  }

  getFriendsList(){
    this.httpService.httpGet('Videos').subscribe((response)=>{
      console.log(response);
      if(Array.isArray(response) && response.length > 0){
        this.videosArray = [];
         response.forEach(video=>{
          let videoDetails:any = {};
          videoDetails.videoSrc = video.coverPhotoUrl;
          videoDetails.videoUrl = video.url;
          this.videosArray.push(videoDetails);
        })
      }
     },(error)=>{
       console.log(error);
     })
  }
}
