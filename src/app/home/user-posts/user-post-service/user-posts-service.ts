import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPostsService {
  previewEvent: any;
  posts:Array<any> = [];
  events: Array<any> = [];
  @Output() emitNewUserPost = new EventEmitter();
  @Output() emitNeweventCreated = new EventEmitter();
  constructor() {
    this.posts = [];
   }

addUserPost(blobUrl){ 
 this.posts.unshift(blobUrl);
 this.emitNewUserPost.emit(blobUrl);   
}

addEvent(eventObj){ 
  this.events.unshift(eventObj);
  this.emitNeweventCreated.emit(eventObj);
 }

 setPreviewEvent(eventObj){
   this.previewEvent = eventObj;
 }

 clearPreviewEvent(){
  this.previewEvent = null;
 }

}
