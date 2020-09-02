import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverLayComponentComponent } from 'src/app/common/over-lay-component/over-lay-component.component';
import { GlobalEmittingEventsService } from '@app/services/global-emitting-events.service';

@Component({
  selector: 'app-photos-grid',
  templateUrl: './photos-grid.component.html',
  styleUrls: ['./photos-grid.component.less']
})
export class PhotosGridComponent implements OnInit {
  modalReference : any ;
  closeResult = '';
@Input('currentProfileId') currentProfileId;
@Input('showAllFriends') showAllFriends: boolean = false;

@Input('photosArray')photosArray: Array<any> = [
  // {
  //   "imgSrc": "../../assets/images/profile.jpg",
  //   "profileName": "aishitha"
  //  },
]

  @Input('photosGrid') photosGrid = 'photosGrid';
  constructor(private route: Router,
               private modalService?: NgbModal,
               private globalEmitterService?:GlobalEmittingEventsService ) { }

  ngOnInit(): void {
  }

  getHeader(){
    if(this.photosGrid == 'photosGrid'){
       return 'Photos';
    } else if(this.photosGrid == 'friendsGrid'){
      return 'Friends';
    }
  }

  navigate(){
    if(this.photosGrid == 'photosGrid'){
      this.route.navigate([`/profile/${this.currentProfileId}`,'photos']);
   } else if(this.photosGrid == 'friendsGrid'){
    this.route.navigate([`/profile/${this.currentProfileId}`,'connections']);
   }  
  }
  navigatingTo(obj){
    if(this.photosGrid == 'photosGrid'){
      this.openModal(obj)
   } else if(this.photosGrid == 'friendsGrid'){
     this.globalEmitterService.setCurrentProfileObj(obj.profileName);
    this.route.navigate([`/profile/${obj.profileId}`]);
   } 
  }

  openModal(image) {
    this.modalReference = this.modalService.open(OverLayComponentComponent, {ariaLabelledBy: 'modal-basic-title',centered: true});
    this.modalReference.componentInstance.ImageUrl = image.imgSrc; 
    this.modalReference.result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
     
     });
   }

}
