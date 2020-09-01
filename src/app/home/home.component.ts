import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @Input('usedIn')usedIn: string = null;
  
  constructor() { }

  ngOnInit(): void {
  }

}
