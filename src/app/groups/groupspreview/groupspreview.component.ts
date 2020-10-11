import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GroupsService } from '../groups.service';
import { groups, groupsActions, groupsListResponse, members } from '../groups.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { IprofileDetails } from '@app/common/models/profile.model';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';
import { GroupsComponent } from '../groups.component';
import { HttpService } from '@app/interceptors/http.service';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator'

// Dynamic component load example code
// export const entryComponentsMap = {
//   'GroupsComponent':GroupsComponent,
// }
// @ViewChild('addcomponents', { read: ViewContainerRef, static: true })
// addcomponents: ViewContainerRef;
// ref: any;
// loadComponet(componentName) {
//   this.clearChildviews();
//   let comp = entryComponentsMap[componentName];
//   let factory = this.componentFactoryResolver.resolveComponentFactory(comp);
//   this.ref = this.addcomponents.createComponent(factory);
//   this.ref.changeDetectorRef.detectChanges();
// }

// clearChildviews() {
//   const childs2 = this.addcomponents.length;
//   let index2 = 0;
//   while (childs2 > index2) {
//     this.addcomponents.remove(0);
//     index2++;
//   }
// }
// private componentFactoryResolver?: ComponentFactoryResolver


@Component({
  selector: 'app-groupspreview',
  templateUrl: './groupspreview.component.html',
  styleUrls: ['./groupspreview.component.less']
})
export class GroupspreviewComponent implements OnInit,AfterViewInit {
  
//name generator config start
 customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

//name generator config end

  currentGroupId: string = '';
  modalReference: any = '';
  group: groups;
  updateGroupDetails:groups; 
  showItemsHeight = '100px';
  @ViewChild('deleteGroupConfirmation') deleteGroupConfirmation;
  @ViewChild('addToGroup') addToGroup;
  @ViewChild('removeFromGroup') removeFromGroup;
  @ViewChild('approveGroupRequests') approveGroupRequests;
  @ViewChild('inviteToGroup') inviteToGroup;
  @ViewChild('groupMembers') groupMembers;
  @ViewChild('editGroup') editGroup;
  @ViewChild('giveAdminAccess') giveAdminAccess;
  @ViewChild('removeAdminAccess') removeAdminAccess;
  @ViewChild('defaultGroup') defaultGroup;

  friendsArray: Array<any> = [];

  cities1 = [
    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
    {label:'New York', value:{id:2, name: 'New York', code: 'NY'}},
    {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
    {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
    {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
];

  selectedCar: any = 'BMW';
  selectedCars3 = [
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'Ravi', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'Raghu', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kiran', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kishore', profileImageUrl: '', profileCoverImageUrl: '' }
  ]
  cars = [
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'Raghu', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kiran', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kishore', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'Raghu', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kiran', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kishore', profileImageUrl: '', profileCoverImageUrl: '' }];
 selectedCars2: Array<members> = [];
  selectedFriends: Array<members> = [];
  filteredFriendsMultiple: Array<members> = [];
  searchFriends: Array<IprofileDetails> = [
    { profileId: '1', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '', value:{id:1} },
    { profileId: '2', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '',value:{id:2}  },
    { profileId: '3', name: 'Raghu', profileImageUrl: '', profileCoverImageUrl: '',value:{id:3}  },
    { profileId: '4', name: 'kiran', profileImageUrl: '', profileCoverImageUrl: '',value:{id:4}  },
    { profileId: '5', name: 'kishore', profileImageUrl: '', profileCoverImageUrl: '',value:{id:5} },
  ];

  actionItems: Array<groupsActions> = [
    {
      "label": 'Invite to group',
      "show": false,
      "showTo": ["member"]
    },
    {
      "label": 'Give admin access',
      "show": false,
      "showTo": ["mainadmin", "admin"]
    },
    {
      "label": 'Remove admin access',
      "show": false,
      "showTo": ["mainadmin", "admin"]
    },
    {
      "label": 'Add to group',
      "show": false,
      "showTo": ["admin", "mainadmin"]
    },
    {
      "label": 'Remove from group',
      "show": false,
      "showTo": ["admin", "mainadmin"]
    },
    {
      "label": 'Approve group request',
      "show": false,
      "showTo": ["admin", "mainadmin"]
    },
    {
      "label": 'Delete group',
      "show": false,
      "showTo": ["admin", "mainadmin"]
    },
    {
      "label": 'Group members',
      "show": false,
      "showTo": ["admin", "mainadmin","member"]
    },
    {
      "label": 'Edit Group',
      "show": false,
      "showTo": ["admin", "mainadmin"]
    },
    {
      "label": 'Make default group',
      "show": false,
      "showTo": ["admin", "mainadmin","member"]
    }
  ]

  constructor(private groupService: GroupsService,
              private modalService: NgbModal,
              private router: Router,
              public messageService: MessageService,
              private httpService:HttpService,
              private activatedRoute: ActivatedRoute
             ) { }

  ngOnInit(): void {
    this.group = {
      ...this.groupService.groupPreviewObj
    }
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.has('id')); // true has() ,get(),      getAll()
      // console.log(params.get('id'));
      this.currentGroupId = params.get('groupId');
      this.getGroupDetails();
    });
    // this.filterShowActions();
  }
  ngAfterViewInit(){
  // $('.ui-autocomplete-dropdown').click();
  }

  filterShowActions() {
    if (this.group.memberType.toLowerCase() == 'admin' || this.group.memberType.toLowerCase() == 'mainadmin') {
      this.group.isAdmin = true;
      this.group.isMainAdmin = false;
      if (this.group.memberType == 'mainAdmin') {
        this.group.isMainAdmin = true;
      }
    } else {
      this.group.isAdmin = false;
      this.group.isMainAdmin = false;
    }
    this.actionItems.forEach(action => {
      if (action.showTo.includes(this.group.memberType.toLowerCase())) {
        action.show = true;
      } else {
        action.show = false;
      }
    });
    let height = 0;
    this.actionItems.forEach(action => {
      if (action.show) {
        height = height + 35;
      }
    });
    if (height > 150) {
      height = 150;
    }
    this.showItemsHeight = height + 'px';
  }

  open(content) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      centered : true,
      ariaLabelledBy: 'modal-basic-title'
};
    this.modalReference = this.modalService.open(content,ngbModalOptions);
    this.modalReference.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      this.filteredFriendsMultiple = [];
      this.selectedFriends = [];
    }, (reason) => {
      this.filteredFriendsMultiple = [];
      this.selectedFriends = [];
      this.updateGroupDetails = null;
    });
  }

  menuAction(actionItem, index, actionLabel) {
    if (actionLabel == 'Delete group') {
      this.open(this.deleteGroupConfirmation);
    } else if (actionLabel == 'Add to group') {
      this.open(this.addToGroup);
    } else if (actionLabel == 'Invite to group') {
      this.open(this.inviteToGroup);
    } else if (actionLabel == 'Remove from group') {
      this.open(this.removeFromGroup);
    } else if (actionLabel == 'Approve group request') {
      this.open(this.approveGroupRequests);
    } else if(actionLabel == 'Group members'){
      this.open(this.groupMembers);
    } else if (actionLabel == 'Edit Group'){
      this.updateGroupDetails = Object.assign ({},this.group);
      setTimeout(()=>{
        this.open(this.editGroup);
      },50) 
    } else if (actionLabel == 'Give admin access'){
      //this.getFriendsList();
      this.open(this.giveAdminAccess);
    }else if (actionLabel == 'Remove admin access'){ 
      this.open(this.removeAdminAccess);
    } else if (actionLabel == 'Make default group'){
      this.open(this.defaultGroup);
    }
  }

  deleteGroup(modal) {
    // this.modalReference.close();
    let endPiont = `Group/${this.currentGroupId}`;
    this.groupService.deleteGroup(endPiont).subscribe(data=>{
      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Group deleted successfully'});
      modal.dismiss('Cross click');
      this.router.navigate(['/groups']);
    });
   
  }

  removeMembersFromGroup(modal, selectedFriends:Array<members>){
    if(selectedFriends.length>0){
      let endPoint = `Group/${this.group.groupId}/GroupMember/${selectedFriends[0].profileId}`;
      this.groupService.removeGroupMember(endPoint).subscribe(resp=>{
      modal.dismiss('Cross click');
      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Selected members removed from this group successfully'});
      this.getGroupDetails();
    });
     }
  }

  approveMembers(modal){
    modal.dismiss('Cross click');
  }

  inviteMembers(modal){
    modal.dismiss('Cross click');
  }
  addMembersToGroup(modal, selectedFriends:Array<members>){
    if(selectedFriends.length>0){
     let endPoint = `Group/${this.group.groupId}/GroupMember/${selectedFriends[0].profileId}`
     this.groupService.addGroupMember(endPoint).subscribe(resp=>{
     modal.dismiss('Cross click');
     this.messageService.add({severity:'success', summary: 'Success Message', detail:'Selected members added to this group successfully'});
     this.getGroupDetails();
   });
    }
  }

  updateGroupFields(modal){
  //  this.group = Object.assign ({},this.updateGroupDetails);
   let updateGroupsObj = {
    "id": this.updateGroupDetails.groupId,
    "name": this.updateGroupDetails.groupName,
    "groupDescription": this.updateGroupDetails.groupDescription,
    "groupCategory": this.updateGroupDetails.groupCategory
   };
   let endPoint = `Group`;
   this.groupService.updateGroupDetails(endPoint,updateGroupsObj).subscribe(resp =>{
    modal.dismiss('Cross click');
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Group details updated Successfully'}); 
    this.getGroupDetails();
  });
  }
  confirmAdminAccess(modal, selectedFriends:Array<members> ){
    if(selectedFriends.length > 0){
      let endPoint = `Group/${this.group.groupId}/GroupAdmin/${selectedFriends[0].profileId}`;
      this.groupService.addGroupAdmin(endPoint).subscribe(resp=>{
      modal.dismiss('Cross click');
      this.messageService.add({severity:'success', summary: 'Admin Access', detail:'Admin Access given to selected members'});
      this.getGroupDetails();
    });
    }
  }

  confirmRemoveAdminAccess(modal, selectedFriends:Array<members>){
    if(selectedFriends.length > 0){
    let endPoint = `Group/${this.group.groupId}/GroupAdmin/${selectedFriends[0].profileId}`
    this.groupService.deleteGroupAdmin(endPoint).subscribe(resp=>{
    modal.dismiss('Cross click');
    this.messageService.add({severity:'success', summary: 'Admin Access', detail:'Selected members admin access removed'});
    this.getGroupDetails();
  });
  }
  }

  confirmDefaultGroup(modal){
  this.group.defaultGrop = true;
  modal.dismiss('Cross click');
  }

  filterFriendMultiple(query) {
    // this.countryService.getCountries().then(countries => {
   // this.filteredFriendsMultiple = this.filterCountry(query, this.searchFriends);
    if (this.filteredFriendsMultiple.length <= 0){
     // this.getFriendsList();
     this.filteredFriendsMultiple = [...this.group.members];
    } else {
    this.filteredFriendsMultiple = [...this.group.members];
    }
    // });
  }

  searchMembers(query){
    if (this.filteredFriendsMultiple.length <= 0){
       //this.getFriendsList();
      this.filteredFriendsMultiple = [{profileName: "John Doe",
      profileId: "0d51f375-f8fc-4d6d-849f-8e008ca800a4",
      profileImageUrl: "https://i.redd.it/ih8jzz8wlji51.jpg"}
    ] } else {
     this.filteredFriendsMultiple = [{profileName: "John Doe",
     profileId: "0d51f375-f8fc-4d6d-849f-8e008ca800a4",
     profileImageUrl: "https://i.redd.it/ih8jzz8wlji51.jpg"}];
     }
  }

  filterCountry(query, friends: IprofileDetails[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < friends.length; i++) {
      let friend = friends[i];
      if (friend.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(friend);
      }
    }
    return filtered;
  }


  getFriendsList(){
    this.httpService.httpGet('User/111/Friends').subscribe((response)=>{
      console.log(response);
      if(Array.isArray(response) && response.length > 0){
        this.friendsArray = [];
        this.friendsArray = response;
        this.filteredFriendsMultiple = this.friendsArray;
      }
     },(error)=>{
       console.log(error);
     });
  }

getGroupDetails() {
  this.groupService.getAllGroups(`Group/${this.currentGroupId}`).subscribe((resp:groupsListResponse) => {
    console.log('group details', resp);
    // this.groupsListDetails = resp;
    let res:any = resp;
    if(resp && typeof(res) == "object"){
        let group:groups = {
          groupName: resp.name,
          groupId: resp.id,
          groupDescription: resp.groupDescription, 
          privateChanel: false,
          groupPhotoPath: 'assets/eventsImages/usercard.png',
          groupCategory: resp.groupCategory,
          memberType: resp.groupMemberType,
          defaultGrop: resp.defaultGrop,
          members: resp.members,
          admins: resp.admins
        } ;
        this.group = group;
        this.filterShowActions();
    }
  });
}

parseMember(members:Array<members> | null):Array<any> | null{
members.forEach(member=>{
    member.profileName = uniqueNamesGenerator(this.customConfig);
    member.profileId = member.adminId ? member.adminId:member.userId;
});
return members;
}
  showal(data){
    console.log("template ref",data);
  }

  changeEvent(value, data){
    console.log("template ref value",value);
    console.log("template ref data",data);
  }

}
