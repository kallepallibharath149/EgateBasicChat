import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-account-and-profile',
  templateUrl: './account-and-profile.component.html',
  styleUrls: ['./account-and-profile.component.less']
})
export class AccountAndProfileComponent implements OnInit {

  items:Array<any> = [
    {menuName: 'Profile',
     icon:'fa fa-user',
     },
    {menuName: 'Create',
    icon:'fa  fa-plus-circle',
   },
    {menuName: 'Messenger',
    icon:'fa fa-envelope-o',
  },
    {menuName: 'Notifications',
    icon:'fa fa-bell',
   },
    {menuName: 'Account',
    icon:'fa fa-caret-down',
    }
  ];

  constructor( private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  addaHoverClass(elementRef:ElementRef){
    this.renderer.removeClass(elementRef,'notHovered');
  this.renderer.addClass(elementRef,'hovered');
  }

  removeClass(elementRef:ElementRef){
    this.renderer.removeClass(elementRef,'hovered');
    this.renderer.addClass(elementRef,'notHovered');
  }

}
