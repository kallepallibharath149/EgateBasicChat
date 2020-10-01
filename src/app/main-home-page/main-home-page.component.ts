import { Component, OnInit, HostBinding, HostListener, ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { GlobalEmittingEventsService } from '../services/global-emitting-events.service';
import { HttpService } from '@app/interceptors/http.service';
import { groups } from '@app/groups/groups.model';
import { Router } from '@angular/router';
import { GroupsService } from '@app/groups/groups.service';

@Component({
  selector: 'app-main-home-page',
  templateUrl: './main-home-page.component.html',
  styleUrls: ['./main-home-page.component.less']
})
export class MainHomePageComponent implements OnInit, AfterContentInit, AfterViewInit {
  loggedInUserDetails:any;
  latestPosts: Array<any> = [];
  element: ElementRef;
  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    console.log("scrolling...");
  }
  @HostListener('window:resize', ['$event'])
  onResize($event) {
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    this.setLeftRightcontainerStyles();

  }

  groupsListDetails: Array<groups> = [
    {  "groupId": '1',
      "groupName": "It Employees Group",
      "groupCategory": "Public",
      "memberType": 'member',
      "defaultGrop": true
     },
     {"groupId": '2',
      "groupName": "Hyderabd employees",
      "groupCategory": "Public",
      "memberType": 'member',
      "defaultGrop": false
     }
  ];
  selectedGroup:groups;

  public setLeftRightcontainerStyles() {
    let topBannerHeight = 0;
    if (document.getElementById('topBanner')) {
      topBannerHeight = document.getElementById('topBanner').clientHeight + 2;
    }
    let finalHeight = window.innerHeight - topBannerHeight;
    this.renderer.setStyle(this.sideGroup.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.sideGroup2.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.leftSideContainer.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.leftSideContainer.nativeElement, 'top', topBannerHeight + 'px');
    this.renderer.setStyle(this.rightSideContainer.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.rightSideContainer.nativeElement, 'top', topBannerHeight + 'px');
  }
  @ViewChild('leftSideContainer', { read: ElementRef, static: false }) leftSideContainer: ElementRef<HTMLElement>;
  @ViewChild('sideGroup2', { read: ElementRef, static: false }) sideGroup2: ElementRef<HTMLElement>;
  @ViewChild('sideGroup', { read: ElementRef, static: false }) sideGroup: ElementRef<HTMLElement>;
  @ViewChild('rightSideContainer', { read: ElementRef, static: false }) rightSideContainer: ElementRef<HTMLElement>;
  constructor(private _elementRef: ElementRef,
    private renderer: Renderer2,
    private globalEmitterService: GlobalEmittingEventsService,
    private httpService:HttpService,
    private router: Router,
    private groupservice: GroupsService) {
    this.element = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.globalEmitterService.emitcurrentNavigation('/home/redirect');
   // this.getInitialLatestPosts();
    // checking default group and navigating to default group
    // let defaultIndex = this.groupsListDetails.findIndex((item:groups)=>{
    //   return item.defaultGrop;
    //  });
    //  let id:any = 0;
    //  this.selectedGroup = this.groupsListDetails[0];
    //  if(defaultIndex >= 0){
    //   this.selectedGroup = this.groupsListDetails[defaultIndex];
    //   id = this.groupsListDetails[defaultIndex].groupId;  
    //  }
    //  this.router.navigate(['/home/groupsPosts', id]);
  }

  ngAfterViewInit() {
    this.setLeftRightcontainerStyles();
  }

  ngAfterContentInit() {
    //this.setLeftRightcontainerStyles();
  }

  getInitialLatestPosts() {
  this.getLatestPosts('initialization');
  }

  getLatestPosts(state?) {
    this.httpService.httpGet('User/111/LatestPosts').subscribe((response) => {
      console.log(response);
      if (Array.isArray(response) && response.length > 0) {
        let postsArray = [];
        response.forEach(timelinePost => {
          let postDetails: any = {};
          postDetails.profileId = timelinePost.profileId;
          postDetails.userName = timelinePost.userName;
          postDetails.isMine = timelinePost.isMine;
          if (timelinePost.postDetails.postType == 'Image') {
            postDetails.imagePost = true;
            postDetails.videoPost = false;
          } else if (timelinePost.postDetails.postType == 'Video') {
            postDetails.videoPost = true;
            postDetails.imagePost = false;
          }
          postDetails.imageVideoUrl = timelinePost.postDetails.postUrl;
          postDetails.postComment = timelinePost.postDetails.postText;
          postsArray.push(postDetails);
        });
        if(state == 'initialization'){
          this.latestPosts = [];
        }
        if (Array.isArray(postsArray) && postsArray.length > 0) {
          this.latestPosts = [...this.latestPosts, ...postsArray];
        } 
      }
    }, (error) => {
      console.log(error);
    });
  }


  onScroll() {
   // this.getLatestPosts();
  }

}
