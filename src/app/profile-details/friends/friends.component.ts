import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit {
  currentProfileId:any = 'raju';
  friendsArray: Array<any> = [];
  constructor(private activatedRoute: ActivatedRoute,
    private httpService?:HttpService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.has('id')); // true has() ,get(),      getAll()
      console.log(params.get('id'));
      this.currentProfileId = params.get('id');
      this.getFriendsList();
    });
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

}
