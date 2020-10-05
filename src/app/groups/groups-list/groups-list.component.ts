import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { groups, groupsListResponse } from '../groups.model';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.less']
})
export class GroupsListComponent implements OnInit {
  groupList: Array<groups> = [
    // {
    //   groupName: 'It Employees Group',
    //   groupDescription: 'group to share latest info related to jobs', 
    //   privateChanel: false,
    //   groupPhotoPath: 'assets/eventsImages/usercard.png',
    //   groupCategory: 'Public',
    //   memberType: 'admin',
    //   defaultGrop: true
    // },
    // {
    //   groupName: 'It Employees Group',
    //   groupDescription: 'group to share latest info related to jobs', 
    //   privateChanel: false,
    //   groupPhotoPath: 'assets/eventsImages/usercard.png',
    //   groupCategory: 'Public',
    //   memberType: 'mainAdmin'
    // },
    // {
    //   groupName: 'It Employees Group',
    //   groupDescription: 'group to share latest info related to jobs', 
    //   privateChanel: false,
    //   groupPhotoPath: 'assets/eventsImages/usercard.png',
    //   groupCategory: 'Public',
    //   memberType: 'member'
    // },
    // {
    //   groupName: 'It Employees Group',
    //   groupDescription: 'group to share latest info related to jobs', 
    //   privateChanel: false,
    //   groupPhotoPath: 'assets/eventsImages/usercard.png',
    //   groupCategory: 'Public',
    //   memberType: 'member'
    // }
  ];

  groupsListDetails: Array<groupsListResponse> = [
    // {  "groupId": '1',
    //   "groupName": "It Employees Group",
    //   "groupCategory": "Public",
    //   "memberType": 'member',
    //   "defaultGrop": false
    //  },
    //  {"groupId": '2',
    //   "groupName": "Hyderabd employees",
    //   "groupCategory": "Public",
    //   "memberType": 'member',
    //   "defaultGrop": true
    //  }
  ];

  constructor(private router:Router,
    private groupService:GroupsService,) { }

  ngOnInit(): void {
    this.groupService.newCreatedGroup.subscribe((newGroup)=>{
      if(newGroup != false){
        this.groupList.push(newGroup);
      }
    });
    this.checkAdminStatus();
    this.getAllGroupDetails();
  }

  getAllGroupDetails() {
    this.groupService.getAllGroups('Group/Groups').subscribe((resp: Array<groupsListResponse>) => {
      console.log('group details', resp);
      this.groupsListDetails = resp;
      if(resp && Array.isArray(resp) && resp.length >0){
        resp.forEach(groupResp=>{
          let group:groups = {
            groupName: groupResp.name,
            groupId: groupResp.id,
            groupDescription: 'group Description', 
            privateChanel: false,
            groupPhotoPath: 'assets/eventsImages/usercard.png',
            groupCategory: 'Public',
            memberType: 'admin',
            defaultGrop: true,
            members:groupResp.members,
            admins:groupResp.admins
          } ;
          this.groupList.push(group);
        });
        this.checkAdminStatus();
      }

    });
  }

  checkAdminStatus(){
    this.groupList.forEach((group:groups)=>{
      if(group.memberType == 'admin' || group.memberType =='mainAdmin'){
         group.isAdmin = true;
         group.isMainAdmin = false;
        if(group.memberType =='mainAdmin'){
        group.isMainAdmin = true;
        }
      } else{
        group.isAdmin = false;
        group.isMainAdmin = false;
      }
    });
  }
  groupPrevievNavigation(group){
  this.groupService.setGroupPreviewObject(group);
  this.router.navigate(['/groups/preview']);
  }

}
