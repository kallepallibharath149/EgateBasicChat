import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

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


  constructor( private renderer: Renderer2,
               private globalEmitterService: GlobalEmittingEventsService) { }

  ngOnInit(): void {
    this.globalEmitterService.scrollingEvent.subscribe(event=>{
     if(event){
      //  this.op.hide();
     }
    });
  }

  addaHoverClass(elementRef:ElementRef,event){
    this.renderer.removeClass(elementRef,'notHovered');
  this.renderer.addClass(elementRef,'hovered');
  }

  removeClass(elementRef:ElementRef){
    this.renderer.removeClass(elementRef,'hovered');
    this.renderer.addClass(elementRef,'notHovered');
  }

}
