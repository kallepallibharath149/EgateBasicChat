import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
// import { MessageService } from '@app/components/public_api';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { groupsActions } from '@app/groups/groups.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.less']
})
export class EventPreviewComponent implements OnInit, OnDestroy {
  modalReference:any = null;
  userDetails: any = null;
  previewEvent:any;
  commentsArray : Array<any> = [];
  showComments: boolean = false;

  showItemsHeight = '100px';
  actionItems: Array<groupsActions> = [
    {
      "label": 'Change Event Status',
      "show": true,
      "showTo": []
    }
  ];
  showinvite:boolean = false;
  countries = [
    { name: 'Accept' ,value: 'Accepted'},
    { name: 'Reject' ,value: 'Rejected' },
    { name: 'Tentative' ,value: 'Tentative' },
    { name: 'Delete' ,value: 'Deleted' },
  ]
  selectedCountry: any = [];
  @ViewChild('updateInvitationStatus') updateInvitationStatus;

  item:any;
  items = [
    {label: 'Audi', value: 'Audi'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Fiat', value: 'Fiat'},
    {label: 'Ford', value: 'Ford'},
    {label: 'Honda', value: 'Honda'},
    {label: 'Jaguar', value: 'Jaguar'},
    {label: 'Mercedes', value: 'Mercedes'},
    {label: 'Renault', value: 'Renault'},
    {label: 'VW', value: 'VW'},
    {label: 'Volvo', value: 'Volvo'},
];
  constructor(private userPostsService:UserPostsService, 
             public messageService: MessageService,
             private globalEmitterService: GlobalEmittingEventsService,
             private modalService: NgbModal) { 
    this.previewEvent = Object.assign({},this.userPostsService.previewEvent,
      );
  }

  ngOnInit(): void {
    this.globalEmitterService.loggedInDetailsEmit.subscribe((userDetails)=>{
      if(userDetails != false){
        this.userDetails = userDetails;
      }
    });
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

  ngOnDestroy(){
    this.userPostsService.clearPreviewEvent();
  }

  updateCommentArray(updatedArray, addedcommentObj){
    this.showComments = true;
     this.commentsArray.push(addedcommentObj);
    }

    updateCommentArrayForReply(updatedObj, addedreplyPostObj,index){
      let repliedObj = this.commentsArray[index];
      repliedObj.commentReplayArray.push(addedreplyPostObj);
      this.commentsArray.splice(index,1,repliedObj);
     }

     invtePeople(event){
      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Selected People are invited to this event'});
      this.showinvite = false;
     }

     setEventAcceptedStatus(event, status){
      this.previewEvent.eventAcceptedStatus = status; 
      }

      updateEventStatus(status){
        this.previewEvent.eventAcceptedStatus = status; 
        this.modalReference.close();
        this.selectedCountry = null;
      }

      menuAction(actionItem, index, actionLabel) {
        if (actionLabel == 'Change Event Status') {
          this.open(this.updateInvitationStatus);
        }
      }
    
      open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
        this.modalReference.result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        
        });
      }

}
