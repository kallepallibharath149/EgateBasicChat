import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {

  activeItem: string = '';
  constructor(private router: Router,
    private globalEmitterService: GlobalEmittingEventsService,) { }

  ngOnInit(): void {
    this.globalEmitterService.emitcurrentNavigation('/events');
  }

  handleEvents(){
    this.router.navigate(['/events']);
  }

  createEvent(){
 this.router.navigate(['/events/create']);
  }

}
