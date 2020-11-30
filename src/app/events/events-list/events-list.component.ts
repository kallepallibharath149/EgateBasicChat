import { Component, OnInit } from '@angular/core';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.less']
})
export class EventsListComponent implements OnInit {

  staticEvents:Array<any> = [
    {
      eventName: 'Birth Day Event',
      eventDescription: 'this is event description.detailed description',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: false,
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
      eventInvited: false,
      eventAcceptedStatus: null
    },
    {
      eventName: 'Marriage',
      eventDescription: '',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'marriage',
      eventInvited: false
    },
    {
      eventName: 'Birth Day Event',
      eventDescription: '',
      fromDate: '22/08/2020',
      toDate : null,
      eventLocation:'Hyderabd',
      eventPhotoPath: 'assets/eventsImages/usercard.png',
      category: 'birthDay',
      eventInvited: false
    }
  ]

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
    this.eventsList = [...this.userPostsService.events,...this.staticEvents];
  }

  ngOnInit(): void {
  }

  eventPrevievNavigation(eventObj){
    this.userPostsService.setPreviewEvent(eventObj);
   this.router.navigate(['testtt/events/preview']);
  }

  stopPropagation(event){
    event.stopPropagation();
  }

  setEventAcceptedStatus(event, index, status){
  this.eventsList[index].eventAcceptedStatus = status; 
  }

}
