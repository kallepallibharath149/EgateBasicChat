import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  // to hide some content in prifile page added this input. Reused this component in profile page 
  @Input('showStories')showStories: boolean = true;
  @Input('posts')posts: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
