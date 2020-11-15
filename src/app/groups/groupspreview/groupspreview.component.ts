import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GroupsService } from '../groups.service';
import { groups, groupsActions, groupsListResponse, members, searchMember } from '../groups.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
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
export class GroupspreviewComponent implements OnInit,AfterViewInit, OnDestroy {
  
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
  emptyMessage:string =' ';
  cars = [];
  selectedCars2: Array<members> = [];
  selectedFriends: Array<members> = [];
  filteredFriendsMultiple: Array<searchMember | members> = [];

  actionItems: Array<groupsActions> = [
    {
      "label": 'Group members',
      "show": false,
      "showTo": ["admin", "mainadmin","member"]
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
      "label": 'Approve group request',
      "show": false,
      "showTo": []
    },
    {
      "label": 'Delete group',
      "show": false,
      "showTo": ["admin", "mainadmin"]
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
  }

  ngOnDestroy(){
    this.groupService.clearGroupPreviewObject(); 
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
      this.open(this.giveAdminAccess);
    }else if (actionLabel == 'Remove admin access'){ 
      this.open(this.removeAdminAccess);
    } else if (actionLabel == 'Make default group'){
      this.open(this.defaultGroup);
    }
  }

  deleteGroup(modal) {
    let endPiont = `Group/${this.currentGroupId}`;
    this.groupService.deleteGroup(endPiont).subscribe(data=>{
      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Group deleted successfully'});
      modal.dismiss('Cross click');
      this.router.navigate(['/groups']);
    });
   
  }

  removeMembersFromGroup(modal, selectedFriends:Array<members>){
    if(selectedFriends.length>0){
      let selectedProfiles = [];
      selectedFriends.forEach(member=>{
        selectedProfiles.push(member.profileId);
      });
      let endPoint = `group/${this.group.groupId}/GroupMembers`;
      this.groupService.removeGroupMember(endPoint,selectedProfiles).subscribe(resp=>{
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
      let selectedProfiles = [];
      selectedFriends.forEach(member=>{
        selectedProfiles.push(member.profileId);
      });
     let endPoint = `group/${this.group.groupId}/GroupMembers`;
     this.groupService.addGroupMember(endPoint, selectedProfiles).subscribe(resp=>{
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

  adminAccessSelectFilter(member:members){
    if(member.isAdmin){
      this.selectedFriends.splice(this.selectedFriends.findIndex(item=>{item.profileId == member.profileId}),1);
    }
  }

  memberSelectFilter(member: members) {
    console.log(member);
    if (member.isMember) {
    this.selectedFriends.splice(this.selectedFriends.findIndex(item=>{item.profileId == member.profileId}),1);
    }
  }

  confirmAdminAccess(modal, selectedFriends:Array<members> ){
    if(selectedFriends.length > 0){
      let selectedProfiles = [];
      selectedFriends.forEach(member=>{
        selectedProfiles.push(member.profileId);
      });
      let endPoint = `group/${this.group.groupId}/GroupAdmins`;
      this.groupService.addGroupAdmin(endPoint, selectedProfiles).subscribe(resp=>{
      modal.dismiss('Cross click');
      this.messageService.add({severity:'success', summary: 'Admin Access', detail:'Admin Access given to selected members'});
      this.getGroupDetails();
    });
    }
  }

  confirmRemoveAdminAccess(modal, selectedFriends:Array<members>){
    if(selectedFriends.length > 0){
      let selectedProfiles = [];
      selectedFriends.forEach(member=>{
        selectedProfiles.push(member.profileId);
      });
    let endPoint = `group/${this.group.groupId}/GroupAdmins`;
    this.groupService.deleteGroupAdmin(endPoint, selectedProfiles).subscribe(resp=>{
    modal.dismiss('Cross click');
    this.messageService.add({severity:'success', summary: 'Admin Access', detail:'Selected members admin access removed'});
    this.getGroupDetails();
  });
  }
  }

  confirmDefaultGroup(modal){
  let endPoint = `group/DefaultGroup?groupId=${this.group.groupId}`;
  this.groupService.updateGroupDetails(endPoint).subscribe(resp=>{
    modal.dismiss('Cross click');
    this.messageService.add({severity:'success', summary: 'Default group', detail:'Updated this group as default group'});
    this.getGroupDetails();
  });
  }

  filterFriendMultiple(query) {
    if (this.filteredFriendsMultiple.length <= 0){
     this.filteredFriendsMultiple = [...this.group.members];
    } else {
    this.filteredFriendsMultiple = [...this.group.members];
    }
  }

  searchMembers(event){
    if (event.query){
      this.emptyMessage = ' ';
       this.filteredFriendsMultiple = [];
      this.getMembersToAdd(event);
   } else {
     this.filteredFriendsMultiple = [...this.filteredFriendsMultiple];
     }
  }




  getMembersToAdd(event):void{
    let endPoint = `User/search?name=${event.query}&pageNumber=1&pagesize=5`
    this.groupService.getMembersToAdd(endPoint).subscribe((resp:Array<searchMember>)=>{
      let filteredProfile = [];
     if(resp && Array.isArray(resp) && resp.length>0){
       resp.forEach(profile=>{
       let users:members =  {
        profileName:profile.firstName + ' '+ profile.lastName,
        profileId:profile.profileId,
        profileImageUrl:profile.profileImageUrl,
        profileCoverImageUrl:profile.profileCoverImageUrl
       }
      let alreadyMember =  this.group.members.some(({profileId:id2})=>{
       return profile.profileId == id2;
       });
       if(alreadyMember){
        users.isMember = true; 
       } else {
        users.isMember = false; 
       }
       filteredProfile.push(users);
      //  filteredProfile = [... this.filteredFriendsMultiple];
       });
      //  this.filteredFriendsMultiple = [...[]];
        this.filteredFriendsMultiple = [...filteredProfile];  
     } else{
      this.emptyMessage = 'No profiles';
     }
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
          defaultGroup: resp.defaultGroup,
          members: this.checkMemberType(resp.members,resp.admins),
          admins: resp.admins
        } ;
        this.group = group;
        this.filterShowActions();
    }
  });
}

checkMemberType(members:Array<members> | null,admins:Array<members> | null):Array<any> | null{
members.forEach(member=>{
let memberStatus =  admins.some(({profileId:id2}) =>{
    return member.profileId == id2;
  });
  if(memberStatus){
    member.isAdmin = true;
  } else{
    member.isAdmin = false; 
  }
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
