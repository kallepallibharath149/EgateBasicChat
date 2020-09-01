import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
import { MessageService } from '@app/components/public_api';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.less']
})
export class EventPreviewComponent implements OnInit, OnDestroy {
  
  previewEvent:any;
  commentsArray : Array<any> = [];
  showComments: boolean = false;

  showinvite:boolean = false;

  item:any;
  items = [
    {label: 'Audi', value: 'Audi'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Fiat', value: 'Fiat'},
    {label: 'Ford', value: 'Ford'},
    {label: 'Honda', value: 'Honda'},
    {label: 'Jaguar', value: 'Jaguar'},
    {label: 'Mercedes', value: 'Mercedes'},
    {label: 'Renault', value: 'Renault'},
    {label: 'VW', value: 'VW'},
    {label: 'Volvo', value: 'Volvo'},
];
  constructor(private userPostsService:UserPostsService, public messageService: MessageService,) { 
    this.previewEvent = Object.assign({},this.userPostsService.previewEvent,
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.userPostsService.clearPreviewEvent();
  }

  updateCommentArray(updatedArray, addedcommentObj){
    this.showComments = true;
     this.commentsArray.push(addedcommentObj);
    }

    updateCommentArrayForReply(updatedObj, addedreplyPostObj,index){
      let repliedObj = this.commentsArray[index];
      repliedObj.commentReplayArray.push(addedreplyPostObj);
      this.commentsArray.splice(index,1,repliedObj);
     }

     invtePeople(event){
      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Selected People are invited to this event'});
      this.showinvite = false;
     }

}
