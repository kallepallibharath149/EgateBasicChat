import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { groupsActions } from '@app/groups/groups.model';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.less']
})
export class InvitationsComponent implements OnInit {
  currentStatusUpdateIndex:number;
  modalReference: any = '';
  showItemsHeight = '100px';
  actionItems: Array<groupsActions> = [
    {
      "label": 'Change Event Status',
      "show": true,
      "showTo": []
    }
  ];

   countries = [
    { name: 'Accept' ,value: 'Accepted'},
    { name: 'Reject' ,value: 'Rejected' },
    { name: 'Tentative' ,value: 'Tentative' },
    { name: 'Delete' ,value: 'Deleted' },
  ]
  selectedCountry: any = [];
  @ViewChild('updateInvitationStatus') updateInvitationStatus;

  staticInvitationEvents: Array<any> = [
    {
      eventName: 'Birth Day Event',
      eventDescription: 'this is event description.detailed description',
      fromDate: '22/08/2020',
      toDate: null,
      eventLocation: 'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: true,
      eventAcceptedStatus: null
    },
    {
      eventName: 'Party',
      eventDescription: 'party description. this is party description',
      fromDate: '22/08/2020',
      toDate: null,
      eventLocation: 'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: true
    },
    {
      eventName: 'Marriage',
      eventDescription: '',
      fromDate: '22/08/2020',
      toDate: null,
      eventLocation: 'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'marriage',
      eventInvited: true
    },
    {
      eventName: 'Birth Day Event',
      eventDescription: '',
      fromDate: '22/08/2020',
      toDate: null,
      eventLocation: 'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: true
    }
  ]
  eventsList: Array<any> = [];
  constructor(private userPostsService: UserPostsService,
    private router: Router,
    private modalService: NgbModal) {
    this.eventsList = [];
    this.eventsList = [...this.staticInvitationEvents];
  }

  ngOnInit(): void {
    this.filterShowActions();
  }

  filterShowActions() {
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

  menuAction(actionItem, index, actionLabel) {
    if (actionLabel == 'Change Event Status') {
      this.currentStatusUpdateIndex = index;
      this.open(this.updateInvitationStatus);
    }
  }

  eventPrevievNavigation(eventObj) {
    this.userPostsService.setPreviewEvent(eventObj);
    this.router.navigate(['testtt/events/preview']);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  setEventAcceptedStatus(event, index, status) {
    this.eventsList[index].eventAcceptedStatus = status;
  }

  updateEventStatus(index, status){
    this.eventsList[index].eventAcceptedStatus = status;
    this.modalReference.close();
    this.selectedCountry = null;
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
    this.modalReference.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      this.currentStatusUpdateIndex = null;
    }, (reason) => {
      this.currentStatusUpdateIndex = null;
    });
  }
}
