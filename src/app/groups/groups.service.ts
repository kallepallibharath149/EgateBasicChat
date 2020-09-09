import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
    
 newCreatedGroup = new BehaviorSubject<any>(false);

 createNewGroup(groupObj){
  this.newCreatedGroup.next(groupObj);
 }

}