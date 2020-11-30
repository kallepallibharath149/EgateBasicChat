import { Component, OnInit } from '@angular/core';
import { groups } from '../groups.model';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPostsService } from '@app/home/user-posts/user-post-service/user-posts-service';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.less']
})
export class CreategroupComponent implements OnInit {
  modalReference:any = null;
  closeResult: any = null;
  createGroupObj: groups = {
    groupName: null,
    groupDescription: null, 
    groupPhotoPath: 'assets/eventsImages/usercard.png',
    groupCoverPhoto: 'assets/eventsImages/usercard.png',
    groupCategory: 'Public',
    memberType: 'mainAdmin'
  };
  constructor(public domSanitizationService: DomSanitizer,
    private modalService: NgbModal,
    private userPostsService : UserPostsService,
    private router:Router,
    private groupService:GroupsService) { }

  ngOnInit(): void {
  
  }

  groupPhotoUploading(){
    $("#group_photo_upload").click();
 }

 handlePhotoUpload(event) {
  let selectedFile: any;
  selectedFile = document.getElementById('group_photo_upload');
  let dataa = <File>selectedFile.files[0];
  let selectedPhotoUrl = URL.createObjectURL(dataa);
  this.createGroupObj.groupCoverPhoto = this.domSanitizationService.bypassSecurityTrustUrl(selectedPhotoUrl);
  this.createGroupObj.groupPhotoPath = this.domSanitizationService.bypassSecurityTrustUrl(selectedPhotoUrl);
}

 createNewGroup(groupForm:NgForm){
   let newGroupObj:groups = Object.assign({},this.createGroupObj);
   let endPoint = 'Group';
   let groupDetails = {
     "Name": newGroupObj.groupName,
     "CreatedById": '62d5649b-0cf7-4aec-b245-a41aadaef604',
     "GroupDescription":newGroupObj.groupDescription,
     "GroupCategory": newGroupObj.groupCategory
   }
   this.groupService.createGroup(endPoint, groupDetails ).subscribe(resp=>{
      groupForm.reset();
      this.router.navigate(['testtt/groups']);
   });
   }

   resetForm(groupForm:NgForm, confirmRef){
    if(groupForm.touched && groupForm.dirty){
      this.open(confirmRef);
    } else{
      groupForm.reset();
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

    confirmDiscard(eventForm:NgForm){
      this.closeModal('');
      eventForm.reset();
      this.router.navigate(['testtt/groups']);
    }

}
