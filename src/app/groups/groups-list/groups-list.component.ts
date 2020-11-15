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
  showContentLoading:boolean = false;
  groupList: Array<groups> = [];
  groupsListDetails: Array<groupsListResponse> = [ ]; // response group data

  constructor(private router:Router,
    private groupService:GroupsService,) { }

  ngOnInit(): void {
    this.getAllGroupDetails();
  }

  getAllGroupDetails() {
    this.showContentLoading = true;
    this.groupService.getAllGroups('Group/Groups').subscribe((resp: Array<groupsListResponse>) => {
      console.log('group details', resp);
      this.groupsListDetails = resp;
      if(resp && Array.isArray(resp) && resp.length >0){
        this.showContentLoading = false;
        resp.forEach(groupResp=>{
          let group:groups = {
            groupName: groupResp.name,
            groupId: groupResp.id,
            groupDescription: groupResp.groupDescription, 
            privateChanel: false,
            groupPhotoPath: 'assets/eventsImages/usercard.png',
            groupCategory:groupResp.groupCategory,
            memberType: groupResp.groupMemberType,
            defaultGroup: groupResp.defaultGroup,
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
      if( group.memberType  && (group.memberType.toLowerCase() == 'admin' || group.memberType.toLowerCase() =='mainadmin')){
         group.isAdmin = true;
         group.isMainAdmin = false;
        if(group.memberType =='mainadmin'){
        group.isMainAdmin = true;
        }
      } else{
        group.isAdmin = false;
        group.isMainAdmin = false;
      }
    });
  }
  groupPrevievNavigation(group:groups){
  this.groupService.setGroupPreviewObject(group);
  this.router.navigate(['/groups/preview', group.groupId]);
  }

}
