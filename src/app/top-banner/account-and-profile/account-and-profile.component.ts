import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-account-and-profile',
  templateUrl: './account-and-profile.component.html',
  styleUrls: ['./account-and-profile.component.less']
})
export class AccountAndProfileComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private globalEmitterService: GlobalEmittingEventsService,
    private authService: AuthService) { }

  ngOnInit(): void {

  }

  logOut() {
    this.authService.logOutUser();
  }

}
