import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

 groupPreviewObj: any = null;
 newCreatedGroup = new BehaviorSubject<any>(false);

 createNewGroup(groupObj){
  this.newCreatedGroup.next(groupObj);
 }

 setGroupPreviewObject(eventObj){
  this.groupPreviewObj = eventObj;
}

clearGroupPreviewObject(){
 this.groupPreviewObj = null;
}

}