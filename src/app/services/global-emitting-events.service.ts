import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEmittingEventsService {
  heightObj :any;
  @Output() navigationEventEmitter = new EventEmitter();
  @Output() currentTopNavHeightObj = new EventEmitter();
  curentProfileObj: any = null;
  loggedInUserDetails: any = null;
  loggedInDetailsEmit = new BehaviorSubject<any>(false);
  scrollingEvent = new BehaviorSubject<any>(false);

  constructor() { }


  emitcurrentNavigation(navigation){
    this.navigationEventEmitter.emit(navigation);
  }

  emitcurrentTopNavHeightObj(heightObj){
    this.heightObj = heightObj;
    this.currentTopNavHeightObj.emit(heightObj);
  }

  emitScrollingEvent(event){
   this.scrollingEvent.next(event);
  }

  setCurrentProfileObj(profileobj){
    this.curentProfileObj = profileobj;
  }

  getCurrentProfileObj():any{
    return this.curentProfileObj
  }

  setLoggedInUserDetails(loggedInuserDetails){
    this.loggedInUserDetails = loggedInuserDetails;
    this.loggedInDetailsEmit.next(loggedInuserDetails);
  }

  getLoggedInUserDetails():any{
    return this.loggedInUserDetails;
  }
}
