import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { comment } from '@app/common/models/posts.model';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.less']
})
export class ReplyCommentComponent implements OnInit {

  @Input() commentReplayItem: comment = null;

  @Output() replyToMainComment = <any>new EventEmitter();

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  replyToComment(){
  this.replyToMainComment.emit();
  }

  navigateToProfile() {
    this.router.navigate(['testtt/profile', 'raju']);
  }

}
