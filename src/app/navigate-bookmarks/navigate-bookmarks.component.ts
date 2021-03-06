import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-bookmarks',
  templateUrl: './navigate-bookmarks.component.html',
  styleUrls: ['./navigate-bookmarks.component.less']
})
export class NavigateBookmarksComponent implements OnInit {
  navigationItems: Array<any> = [
    {
      "label": "Profile",
      "profileImage":'../../assets/images/profile.jpg',
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/profile",
      "requiredParameters": "raju",
      "optionalParameters": "",
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(navItem) {
    if (navItem.requiredParameters && navItem.requiredParameters.length >0){
      this.router.navigate([navItem.navigate,navItem.requiredParameters]);
    } else{
      this.router.navigate([navItem.navigate]);
    }
  }

}
