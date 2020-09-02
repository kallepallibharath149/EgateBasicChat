import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { GlobalEmittingEventsService } from '../services/global-emitting-events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.less']
})
export class ProfileDetailsComponent implements OnInit {

 currentProfileId:any = 'raju';
 currentProfileName:any = 'raju';
  navigationItems: Array<any> = [
    {
      "label": "Timeline",
      "navigate": "",
      "optionalParameters": "",
      "requiredParameters": ""
    },
    {
      "label": "About",
      "navigate": "about",
      "optionalParameters": "",
      "requiredParameters": ""
    },
    {
      "label": "Photos",
      "navigate": "photos",
      "optionalParameters": "",
      "requiredParameters": ""
    },
    {
      "label": "Friends",
      "navigate": "connections",
      "optionalParameters": "",
      "requiredParameters": ""
    }  
  ]; 

  moreDropdownnavigationItems: Array<any> = [
    {
      "label": "Videos",
      "navigate": "videos",
      "optionalParameters": "",
      "requiredParameters": ""
    },
    // {
    //   "label": "Books",
    //   "navigate": "about",
    //   "optionalParameters": "",
    //   "requiredParameters": ""
    // },
    // {
    //   "label": "Films",
    //   "navigate": "photos",
    //   "optionalParameters": "",
    //   "requiredParameters": ""
    // },
    // {
    //   "label": "Music",
    //   "navigate": "connections",
    //   "optionalParameters": "",
    //   "requiredParameters": ""
    // },
    // {
    //   "label": "sports",
    //   "navigate": "connections",
    //   "optionalParameters": "",
    //   "requiredParameters": ""
    // } 
  ]; 
  profileName: string = "Kallepalli Bharath Raju"
  isMyProfile: boolean = false ;

  constructor(private _elementRef: ElementRef,
    private renderer: Renderer2,
    private globalEmitterService: GlobalEmittingEventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService?:HttpService) { }

  ngOnInit(): void {
    this.globalEmitterService.emitcurrentNavigation('/profile');
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.has('id')); // true has() ,get(),      getAll()
      // console.log(params.get('id'));
      this.currentProfileId = params.get('id');
      this.currentProfileName = this.globalEmitterService.getCurrentProfileObj();
    });
  //   this.activatedRoute.queryParamMap.subscribe(params => {
  //  this.currentProfileName = params.get('profilename');
  // });
  }


  navigate(navItem) {
    if(navItem.navigate && navItem.navigate.length>0){
    //this.router.navigateByUrl(`profile/${this.currentProfileId}${navItem.navigate?'/'+navItem.navigate:''}`);
    this.router.navigate([`/profile/${this.currentProfileId}`,navItem.navigate]);
    } else if(!navItem.navigate){
      if(navItem.label =='Timeline'){
        this.router.navigate([`/profile/${this.currentProfileId}`]);
      }
    }  
  }

}
