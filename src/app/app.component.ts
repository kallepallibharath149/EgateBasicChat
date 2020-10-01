import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { GlobalEmittingEventsService } from './services/global-emitting-events.service';
import {MessageService} from 'primeng/api';
import { PlatformLocation } from '@angular/common'
import { Router, NavigationStart, Event } from '@angular/router';
import { LoginServiceService } from './login/login-service.service';
import { HttpService } from './interceptors/http.service';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [NgbProgressbarConfig]
})
export class AppComponent implements OnInit, AfterViewInit {
  loggedInUserDetails:any;


  
  chatContainer:Array<any> =[{}];
  closeResult = '';
  public isCollapsed = false;
  @HostListener('window:resize', ['$event'])
  onResize($event) {
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    this.setLeftRightcontainerStyles();
  };
  public setLeftRightcontainerStyles() {
    let topBannerHeight = 0;
    if (document.getElementById('topBanner')) {
      topBannerHeight = document.getElementById('topBanner').clientHeight + 2;
    }
    let finalHeight = window.innerHeight - topBannerHeight;
    let heightObj = {
      "finalHeight" : finalHeight,
      "topBannerHeight": topBannerHeight
    }
    this.globalEmitterService.emitcurrentTopNavHeightObj(heightObj);
  }
   data: any;
   date3:any;
   checked: boolean = false;
  constructor( private globalEmitterService: GlobalEmittingEventsService, 
              config: NgbProgressbarConfig,private modalService: NgbModal,
              public messageService: MessageService,
              private location: PlatformLocation,
              private router: Router,
              private loginService:LoginServiceService,
              private httpService:HttpService,
              private primengConfig: PrimeNGConfig) {
    // customize default values of progress bars used by this component tree
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }
    config.max = 1000;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }
  title = 'basicChat';
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
 ngOnInit(){
  this.primengConfig.ripple = true;
   let data = 'dada';
   this.loginService.checkLogInStateAndNavigate();
   this.getUserDetails();
 }

 ngAfterViewInit(){
  this.setLeftRightcontainerStyles();
this.hideFreeHost();
 }

 logInCheck(){
  if(!this.loginService.getLoggedInstate()){
    this.router.navigate(['/login']);   
  }
 }

 hideFreeHost(){
  setTimeout(()=>{
    $("a[title='Free Web Hosting with PHP5 or PHP7']").parent().css("display","none");
  },2000);
 }
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  display: boolean = false;

  showDialog() {
      this.display = true;
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
}

showInfo() {
    this.messageService.add({severity:'info', summary: 'Info Message', detail:'PrimeNG rocks'});
}

showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn Message', detail:'There are unsaved changes'});
}

showError() {
    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
}

showCustom() {
    this.messageService.add({key: 'custom', severity:'info', summary: 'Custom Toast', detail:'With a Gradient'});
}

showTopLeft() {
    this.messageService.add({key: 'tl', severity:'info', summary: 'Success Message', detail:'Order submitted'});
}

showTopCenter() {
    this.messageService.add({key: 'tc', severity:'warn', summary: 'Info Message', detail:'PrimeNG rocks'});
}

showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

showMultiple() {
    this.messageService.addAll([
        {severity:'info', summary:'Message 1', detail:'PrimeNG rocks'},
        {severity:'info', summary:'Message 2', detail:'PrimeUI rocks'},
        {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}
    ]);
}

onConfirm() {
    this.messageService.clear('c');
}

onReject() {
    this.messageService.clear('c');
}

clear() {
    this.messageService.clear();
}

getUserDetails(){
  this.httpService.httpGet('User/111/UserDetails').subscribe((response)=>{
    console.log(response);
    if(response){
   this.loggedInUserDetails = response;
   this.globalEmitterService.setLoggedInUserDetails(response);
    }
   },(error)=>{
     console.log(error);
   })
}

}
