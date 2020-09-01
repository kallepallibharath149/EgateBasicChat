import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-home-page-messenger',
  templateUrl: './main-home-page-messenger.component.html',
  styleUrls: ['./main-home-page-messenger.component.less']
})
export class MainHomePageMessengerComponent implements OnInit {

  currentChatList: Array<any> = [
    {
      "profileName": "Satya",
      "profileImage":'../../assets/images/profile.jpg',
      "isActive": true,
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "profileName": "Keerthi",
      "profileImage":'../../assets/images/profile.jpg',
      "isActive": true,
      "icon": "fa fa-users",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "profileName": "Raghu",
      "profileImage":'../../assets/images/profile.jpg',
      "isActive": true,
      "icon": "fa fa-calendar-o",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "profileName": "Ramu",
      "profileImage":'../../assets/images/profile.jpg',
      "isActive": true,
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "profileName": "Renuka",
      "profileImage":'../../assets/images/profile.jpg',
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "profileName": "somu",
      "profileImage":'../../assets/images/profile.jpg',
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
    {
      "profileName": "Profile",
      "profileImage":'../../assets/images/profile.jpg',
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "optionalParameters": "",
      "styleObject":'',
      "classObject":''
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

  openChat(chatObj){

  }

}
