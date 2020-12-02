import { Component, Input, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { groups, groupsListResponse } from '@app/groups/groups.model';
import { GroupsService } from '@app/groups/groups.service';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.less']
})
export class LeftContainerComponent implements OnInit {

  menuOptions: Array<any> = [
    {
      "label": "My Connections",
      "icon": "fa fa-users",
      "class": "",
      "id": "",
      "navigate": "/connections",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "My Events",
      "icon": "fa fa-calendar-o",
      "class": "",
      "id": "",
      "navigate": "testtt/events",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    }
  ];
  selectedGroupIndex:number = 0;
  groupsListDetails: Array<groupsListResponse> = [];

  showDetails(data) {
    console.log("groupNames", data)
  }

  navigateGroup(group: groupsListResponse, index) {
    this.selectedGroupIndex = index;
    this.router.navigate(['testtt/groupsPosts/details', group.id]);
  }

  constructor(private router: Router,
    private globalEmitterService: GlobalEmittingEventsService,
    private groupservice: GroupsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails) => {
    //   if (userDetails != false) {
    //     let profileIndex = this.navigationItems.findIndex((item) => {
    //       return item.label == 'Profile';
    //     });
    //     this.navigationItems[profileIndex].profileImage = userDetails.profileImageUrl;
    //     this.navigationItems[profileIndex].profileName = userDetails.name;
    //   }
    // });
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.has('id')); // true has() ,get(),      getAll()
      // this.currentGroupId = params.get('groupId');
    });
    this.getAllGroupDetails();
  }

  getAllGroupDetails() {
    this.groupservice.getAllGroups('Group/Groups').subscribe((resp: Array<groupsListResponse>) => {
      console.log('group details', resp);
      this.groupsListDetails = resp;
      this.navigateToDefaultGroup();
    });
  }

  navigateToDefaultGroup() {
    // checking default group and navigating to default group
    if (this.groupsListDetails.length > 0) {
      let defaultIndex = this.groupsListDetails.findIndex((item: groupsListResponse) => {
        return item?.defaultGroup;
      });
      let id: any = 0;
      id = this.groupsListDetails[0].id;
      if (defaultIndex >= 0) {
        id = this.groupsListDetails[defaultIndex].id;
        this.selectedGroupIndex = defaultIndex;
      }
      if (!(window.location.pathname.includes('groupsPosts'))) {
        this.router.navigate(['testtt/groupsPosts/details', id]);
      }
    } else if (this.groupsListDetails.length <= 0) {
      this.router.navigate(['testtt/groupsPosts/noGroups']);
    }
  }

  navigate(navItem) {
    if (navItem.requiredParameters && (navItem.requiredParameters == true)) {
      this.router.navigate([navItem.navigate, navItem.requiredParameters]);
    } else {
      this.router.navigate([navItem.navigate]);
    }
  }

}
