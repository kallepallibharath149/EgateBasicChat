import { Component, OnInit } from '@angular/core';
import { GlobalEmittingEventsService } from '../services/global-emitting-events.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less']
})
export class MessengerComponent implements OnInit {

  constructor(private globalEmitterService:GlobalEmittingEventsService) { }

  ngOnInit(): void {
    this.globalEmitterService.emitcurrentNavigation('/messenger');
  }

}
