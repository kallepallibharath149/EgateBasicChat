import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.less']
})
export class CreateEventComponent implements OnInit {
  modalReference: any;
  closeResult: any;
  createEvent: {[key: string]: any} = {
    eventName: '',
    eventDescription: '',
    fromDate: null,
    toDate : null,
    eventLocation:'',
    eventPhotoPath: 'assets/eventsImages/usercard.png',
    category: null
  };

  categories = [
    {name: 'Birthday', code: 'Birthday'},
    {name: 'Parties', code: 'Parties'},
    {name: 'Workshops', code: 'Workshops'},
    {name: 'Conferences', code: 'Conferences'},
    {name: 'Shows', code: 'Shows'},
    {name: 'Other', code: 'Shows'}
  ]
  
  constructor(public domSanitizationService: DomSanitizer,
               private modalService: NgbModal,
               private userPostsService : UserPostsService,
               private router:Router ) { }

  ngOnInit(): void {
  }

  eventPhotoUploading(){
    $("#event_photo_upload").click();
 }

  handlePhotoUpload(event) {
    let selectedFile: any;
    selectedFile = document.getElementById('event_photo_upload');
    let dataa = <File>selectedFile.files[0];
    let selectedPhotoUrl = URL.createObjectURL(dataa);
    this.createEvent.eventPhotoPath = this.domSanitizationService.bypassSecurityTrustUrl(selectedPhotoUrl);
  }

  resetForm(eventForm:NgForm, confirmRef){
    if(eventForm.touched && eventForm.dirty){
      this.open(confirmRef);
    } else{
      eventForm.reset();
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true});
    this.modalReference.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
     });
   }

    closeModal(modal){
    this.modalReference.close();
    }

   addNewEvent(eventForm:NgForm){
   let newEventObj = Object.assign({},this.createEvent);
   this.userPostsService.addEvent(newEventObj);
   eventForm.reset();
   this.router.navigate(['/events']);
    }

    confirmDiscard(eventForm:NgForm){
      this.closeModal('');
      eventForm.reset();
      this.router.navigate(['/events']);
    }
}
