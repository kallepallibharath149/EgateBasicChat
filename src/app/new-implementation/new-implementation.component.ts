import { Component, OnInit } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';

@Component({
  selector: 'app-new-implementation',
  templateUrl: './new-implementation.component.html',
  styleUrls: ['./new-implementation.component.less']
})
export class NewImplementationComponent implements OnInit {
  display = false;
  constructor() { }

  ngOnInit(): void {
  }

}
