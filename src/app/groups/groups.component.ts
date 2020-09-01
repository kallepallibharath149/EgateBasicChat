import { Component, OnInit } from '@angular/core';
import { GlobalEmittingEventsService } from '../services/global-emitting-events.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit {

  constructor(private globalEmitterService:GlobalEmittingEventsService) { }

  ngOnInit(): void {
    this.globalEmitterService.emitcurrentNavigation('/groups');
  }

}
