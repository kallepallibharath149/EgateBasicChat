import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from '../groups.service';
import { groups, groupsActions } from '../groups.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { IprofileDetails } from '@app/common/models/profile.model';
import { MessageService } from '@app/components/public_api';
import * as $ from 'jquery';

@Component({
  selector: 'app-groupspreview',
  templateUrl: './groupspreview.component.html',
  styleUrls: ['./groupspreview.component.less']
})
export class GroupspreviewComponent implements OnInit,AfterViewInit {
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
    { profileId: 'dgdgdgdgdgdgd', name: 'kishore', profileImageUrl: '', profileCoverImageUrl: '' }];
 selectedCars2: Array<IprofileDetails> = [];
  selectedFriends: Array<IprofileDetails> = [];
  filteredFriendsMultiple: Array<IprofileDetails>;
  searchFriends: Array<IprofileDetails> = [
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'raju', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'Raghu', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kiran', profileImageUrl: '', profileCoverImageUrl: '' },
    { profileId: 'dgdgdgdgdgdgd', name: 'kishore', profileImageUrl: '', profileCoverImageUrl: '' },
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
      "showTo": ["mainAdmin"]
    },
    {
      "label": 'Remove admin access',
      "show": false,
      "showTo": ["mainAdmin"]
    },
    {
      "label": 'Add to group',
      "show": false,
      "showTo": ["admin", "mainAdmin"]
    },
    {
      "label": 'Remove from group',
      "show": false,
      "showTo": ["admin", "mainAdmin"]
    },
    {
      "label": 'Approve group request',
      "show": false,
      "showTo": ["admin", "mainAdmin"]
    },
    {
      "label": 'Delete group',
      "show": false,
      "showTo": ["admin", "mainAdmin"]
    },
    {
      "label": 'Group members',
      "show": false,
      "showTo": ["admin", "mainAdmin","member"]
    },
    {
      "label": 'Edit Group',
      "show": false,
      "showTo": ["admin", "mainAdmin"]
    },
  ]
  constructor(private groupService: GroupsService,
              private modalService: NgbModal,
              private router: Router,
              public messageService: MessageService
             ) { }

  ngOnInit(): void {
    this.group = {
      ...this.groupService.groupPreviewObj
    }
    this.filterShowActions();
    
  }
  ngAfterViewInit(){
  // $('.ui-autocomplete-dropdown').click();
  }

  filterShowActions() {
    if (this.group.memberType == 'admin' || this.group.memberType == 'mainAdmin') {
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
      if (action.showTo.includes(this.group.memberType)) {
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
    }
  }

  deleteGroup(modal) {
    // this.modalReference.close();
    modal.dismiss('Cross click');
    this.router.navigate(['/groups']);
  }

  removeMembersFromGroup(modal){
    modal.dismiss('Cross click'); 
  }

  approveMembers(modal){
    modal.dismiss('Cross click');
  }

  inviteMembers(modal){
    modal.dismiss('Cross click');
  }
  addMembersToGroup(modal){
    if(this.selectedFriends.length>0){
     // this.modalReference.close();
      modal.dismiss('Cross click');
      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Selected members added to this group'});
    }
  }

  updateGroupFields(modal){
   this.group = Object.assign ({},this.updateGroupDetails)
   modal.dismiss('Cross click');
  this.messageService.add({severity:'success', summary: 'Success Message', detail:'Group details updated Successfully'});
  }
  confirmAdminAccess(modal){
    modal.dismiss('Cross click');
  }

  confirmRemoveAdminAccess(modal){
    modal.dismiss('Cross click');
  }

  filterFriendMultiple(event) {
    let query = event.query;
    // this.countryService.getCountries().then(countries => {
    this.filteredFriendsMultiple = this.filterCountry(query, this.searchFriends);
    // });
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

  showal(data){
    console.log("template ref",data);
  }

  changeEvent(value, data){
    console.log("template ref value",value);
    console.log("template ref data",data);
  }

}
