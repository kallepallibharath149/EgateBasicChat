import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.less']
})
export class InvitationsComponent implements OnInit {
  staticInvitationEvents:Array<any> = [
    {
      eventName: 'Birth Day Event',
      eventDescription: 'this is event description.detailed description',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: true,
      eventAcceptedStatus: null
    },
    {
      eventName: 'Party',
      eventDescription: 'party description. this is party description',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: true
    },
    {
      eventName: 'Marriage',
      eventDescription: '',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'marriage',
      eventInvited: true
    },
    {
      eventName: 'Birth Day Event',
      eventDescription: '',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: true
    }
  ]
  eventsList:Array<any>=[];
  constructor(private userPostsService:UserPostsService,
    private router: Router) { 
      this.eventsList = [];
      this.eventsList = [...this.staticInvitationEvents];
    }

  ngOnInit(): void {
  }

  eventPrevievNavigation(eventObj){
    this.userPostsService.setPreviewEvent(eventObj);
   this.router.navigate(['events/preview']);
  }

  stopPropagation(event){
    event.stopPropagation();
  }

  setEventAcceptedStatus(event, index, status){
  this.eventsList[index].eventAcceptedStatus = status; 
  }

}
