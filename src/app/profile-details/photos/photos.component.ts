import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverLayComponentComponent } from 'src/app/common/over-lay-component/over-lay-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '@app/interceptors/http.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.less']
})
export class PhotosComponent implements OnInit {
  currentProfileId:any = 'raju';
  modalReference : any ;
  closeResult = '';
  photosArray: Array<any> = [
    // {
    //   "imgSrc": "../../assets/images/profile.jpg",
    //   "profileName": "aishitha"
    //  },

  ]

  constructor(private activatedRoute: ActivatedRoute,
              private modalService?: NgbModal,
              private httpService?:HttpService) { }

  ngOnInit(): void {
    this.getPhotos();
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.has('id')); // true has() ,get(),      getAll()
      console.log(params.get('id'));
      this.currentProfileId = params.get('id');
    });
  }

  navigatingTo(obj){
   this.openModal(obj);
  }

  getPhotos(){
    this.httpService.httpGet('Photos').subscribe((response)=>{
      console.log(response);
      if(Array.isArray(response) && response.length > 0){
        this.photosArray = [];
         response.forEach(photo=>{
          let photosDetails:any = {};
          photosDetails.imgSrc = photo.url;
          this.photosArray.push(photosDetails);
        })
      }
     },(error)=>{
       console.log(error);
     })
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
