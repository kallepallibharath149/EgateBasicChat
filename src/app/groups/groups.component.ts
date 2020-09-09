import { Component, OnInit } from '@angular/core';
import { GlobalEmittingEventsService } from '../services/global-emitting-events.service';
import { Router } from '@angular/router';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit {
  activeItem: any = null;
  constructor(private globalEmitterService:GlobalEmittingEventsService,
    private router:Router,
    private groupService:GroupsService) { }

  ngOnInit(): void {
    this.activeItem = 'Group list'
    this.globalEmitterService.emitcurrentNavigation('/groups');
  }

  navigateCreateGroup(){
   this.router.navigate(['/groups/create']);
  }
  navigateGroupList(){
    this.router.navigate(['/groups']);  
  }

}
