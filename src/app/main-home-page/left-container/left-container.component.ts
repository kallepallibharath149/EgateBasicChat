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

  navigationItems: Array<any> = [
    {
      "label": "Profile",
      "profileImage": '../../assets/images/profile.jpg',
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/profile",
      "optionalParameters": "",
      "requiredParameters": true,
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "Connections",
      "icon": "fa fa-users",
      "class": "",
      "id": "",
      "navigate": "/connections",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "Events",
      "icon": "fa fa-calendar-o",
      "class": "",
      "id": "",
      "navigate": "testtt/events",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "Groups Details",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "testtt/groups",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "Messenger",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/messenger",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "Videos",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "/watch",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
    {
      "label": "Profile",
      "icon": "fa fa-user",
      "class": "",
      "id": "",
      "navigate": "",
      "optionalParameters": "",
      "styleObject": '',
      "classObject": ''
    },
  ];

  groupsListDetails: Array<groupsListResponse> = [];
  @Input('selectedGroup') selectedGroup: groupsListResponse;

  showDetails(data) {
    console.log("groupNames", data)
  }

  navigateGroup(group: groupsListResponse) {
    this.router.navigate(['testtt/groupsPosts/details', group.id]);
  }

  constructor(private router: Router,
    private globalEmitterService: GlobalEmittingEventsService,
    private groupservice: GroupsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails) => {
      if (userDetails != false) {
        let profileIndex = this.navigationItems.findIndex((item) => {
          return item.label == 'Profile';
        });
        this.navigationItems[profileIndex].profileImage = userDetails.profileImageUrl;
        this.navigationItems[profileIndex].profileName = userDetails.name;
      }
    });
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
    let defaultIndex = this.groupsListDetails.findIndex((item: groupsListResponse) => {
      return item?.defaultGroup;
    });
    let id: any = 0;
    this.selectedGroup = this.groupsListDetails[0];
    id = this.groupsListDetails[0].id;
    if (defaultIndex >= 0) {
      this.selectedGroup = this.groupsListDetails[defaultIndex];
      id = this.groupsListDetails[defaultIndex].id;
    }
    if (!(window.location.pathname.includes('groupsPosts'))) {
      this.router.navigate(['testtt/groupsPosts/details', id]);
    }
  }

  navigate(navItem) {
    if (navItem.label == 'Profile') {
      let profileId = this.globalEmitterService.getLoggedInUserDetails().profileId;
      let profileName = this.globalEmitterService.getLoggedInUserDetails().name;
      this.globalEmitterService.setCurrentProfileObj(profileName);
      this.router.navigate([navItem.navigate, profileId]);
    } else if (navItem.requiredParameters && (navItem.requiredParameters == true)) {
      this.router.navigate([navItem.navigate, navItem.requiredParameters]);
    } else {
      this.router.navigate([navItem.navigate]);
    }
  }

}
