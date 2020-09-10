import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import { groups } from '../groups.model';

@Component({
  selector: 'app-groupspreview',
  templateUrl: './groupspreview.component.html',
  styleUrls: ['./groupspreview.component.less']
})
export class GroupspreviewComponent implements OnInit {
  group: groups;
  constructor ( private groupService:GroupsService) { }

  ngOnInit(): void {
    this.group = {
      ...this.groupService.groupPreviewObj
    }
  }

}
