import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { groups } from '../groups.model';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.less']
})
export class GroupsListComponent implements OnInit {
  groupList: Array<groups> = [
    {
      groupName: 'It Employees Group',
      groupDescription: 'group to share latest info related to jobs', 
      privateChanel: false,
      groupPhotoPath: 'assets/eventsImages/usercard.png',
      groupCategory: 'Public'
    },
    {
      groupName: 'It Employees Group',
      groupDescription: 'group to share latest info related to jobs', 
      privateChanel: false,
      groupPhotoPath: 'assets/eventsImages/usercard.png',
      groupCategory: 'Public'
    },
    {
      groupName: 'It Employees Group',
      groupDescription: 'group to share latest info related to jobs', 
      privateChanel: false,
      groupPhotoPath: 'assets/eventsImages/usercard.png',
      groupCategory: 'Public'
    },
    {
      groupName: 'It Employees Group',
      groupDescription: 'group to share latest info related to jobs', 
      privateChanel: false,
      groupPhotoPath: 'assets/eventsImages/usercard.png',
      groupCategory: 'Public'
    }
  ];
  constructor(private router:Router,
    private groupService:GroupsService) { }

  ngOnInit(): void {
    this.groupService.newCreatedGroup.subscribe((newGroup)=>{
      if(newGroup != false){
        this.groupList.push(newGroup);
      }
    })
  }

  groupPrevievNavigation(group){
  this.groupService.setGroupPreviewObject(group);
  this.router.navigate(['/groups/preview']);
  }

}
