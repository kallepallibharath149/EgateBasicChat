import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEmittingEventsService {
  heightObj :any;
  @Output() navigationEventEmitter = new EventEmitter();
  @Output() currentTopNavHeightObj = new EventEmitter();
  constructor() { }


  emitcurrentNavigation(navigation){
    this.navigationEventEmitter.emit(navigation);
  }

  emitcurrentTopNavHeightObj(heightObj){
    this.heightObj = heightObj;
    this.currentTopNavHeightObj.emit(heightObj);
  }
}
