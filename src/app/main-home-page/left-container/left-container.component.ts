import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.less']
})
export class LeftContainerComponent implements OnInit {

  navigationItems: Array<any> = [
    {
      "label": "Profile",
      "profileImage":'../../assets/images/profile.jpg',
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/profile",
      "optionalParameters": "",
      "requiredParameters": "raju",
      "styleObject":'',
      "classObject":''
    },
    {
      "label": "Connections",
      "icon": "fa fa-users",
      "class": "",
      "id": "",
      "navigate": "/connections",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "label": "Events",
      "icon": "fa fa-calendar-o",
      "class": "",
      "id": "",
      "navigate": "/events",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "label": "Groups",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/groups",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "label": "Messenger",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/messenger",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "label": "Videos",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/watch",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "label": "Profile",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
  ];

  constructor(private router: Router,
    private globalEmitterService: GlobalEmittingEventsService) { }

  ngOnInit(): void {

   this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails)=>{
     if(userDetails != false){
      let profileIndex =  this.navigationItems.findIndex((item)=>{
        return item.label == 'Profile';
      });
      this.navigationItems[profileIndex].profileImage = userDetails.profileImageUrl; 
      this.navigationItems[profileIndex].profileName =  userDetails.name;
     }
   });
  
  }

  navigate(navItem) {
    if(navItem.label == 'Profile'){
      let profileId = this.globalEmitterService.getLoggedInUserDetails().profileId;
      let profileName = this.globalEmitterService.getLoggedInUserDetails().name;
      this.globalEmitterService.setCurrentProfileObj(profileName);
      this.router.navigate([navItem.navigate,profileId]);
    }else if (navItem.requiredParameters && navItem.requiredParameters.length >0){
      this.router.navigate([navItem.navigate,navItem.requiredParameters]);
    } else{
      this.router.navigate([navItem.navigate]);
    }
  }

}
