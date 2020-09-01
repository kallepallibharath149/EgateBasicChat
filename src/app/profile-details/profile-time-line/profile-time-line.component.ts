import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalEmittingEventsService } from 'src/app/services/global-emitting-events.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-profile-time-line',
  templateUrl: './profile-time-line.component.html',
  styleUrls: ['./profile-time-line.component.less']
})
export class ProfileTimeLineComponent implements OnInit , AfterViewInit{

  currentProfileId:any = 'raju';
  friendsArray: Array<any> = [];
  photosArray: Array<any> = [];
  @ViewChild('leftSideContainer', { read: ElementRef, static: true }) leftSideContainer: ElementRef<HTMLElement>;
  @ViewChild('leftSideContainerScroll', { read: ElementRef, static: false }) leftSideContainerScroll: ElementRef<HTMLElement>;

  constructor(private _elementRef: ElementRef,
    private renderer: Renderer2,
    private globalEmitterService:GlobalEmittingEventsService,
    private activatedRoute: ActivatedRoute,
    private httpService?:HttpService) { }

  ngOnInit(): void {
    // this.globalEmitterService.currentTopNavHeightObj.subscribe(heightDatObj =>{
    //   this.appllyLeftContainerStyles(heightDatObj);
    //  });
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.has('id')); // true has() ,get(),      getAll()
      console.log(params.get('id'));
      this.currentProfileId = params.get('id');
    });
    this.getFriendsList();
    this.getPhotos();
  }

ngAfterViewInit(){
  // this.appllyLeftContainerStyles(this.globalEmitterService.heightObj);
  this.renderer.setStyle(this.leftSideContainer.nativeElement, 'top', '-800px');
}

getFriendsList(){
  this.httpService.httpGet('Friends').subscribe((response)=>{
    console.log(response);
    if(Array.isArray(response) && response.length > 0){
      this.friendsArray = [];
       response.forEach(friend=>{
        let friendDetails:any = {};
        friendDetails.imgSrc = friend.profileImageUrl;
        friendDetails.profileName = friend.name;
        friendDetails.profileId = friend.profileId;

        this.friendsArray.push(friendDetails);
      })
    }
   },(error)=>{
     console.log(error);
   })
}

getPhotos(){
  this.httpService.httpGet('Photos').subscribe((response)=>{
    console.log(response);
    if(Array.isArray(response) && response.length > 0){
      this.photosArray = [];
       response.forEach(photo=>{
        let photosDetails:any = {};
        photosDetails.imgSrc = photo.url;
        this.photosArray.push(photosDetails);
      })
    }
   },(error)=>{
     console.log(error);
   })
}

  // appllyLeftContainerStyles(heightDatObj){
  //   this.renderer.setStyle(this.leftSideContainer.nativeElement, 'height', heightDatObj?.finalHeight + 'px');
  //   this.renderer.setStyle(this.leftSideContainer.nativeElement, 'top', heightDatObj?.topBannerHeight + 'px');
  // }

}
