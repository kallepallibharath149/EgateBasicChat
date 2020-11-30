import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { GlobalEmittingEventsService } from './services/global-emitting-events.service';
import { MessageService } from 'primeng/api';
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

  closeResult = '';
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
      "finalHeight": finalHeight,
      "topBannerHeight": topBannerHeight
    }
    this.globalEmitterService.emitcurrentTopNavHeightObj(heightObj);
  }

  constructor(private globalEmitterService: GlobalEmittingEventsService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private location: PlatformLocation,
    private router: Router,
    private loginService: LoginServiceService,
    private httpService: HttpService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.hideApplicationLoader();
    this.logInCheck();
    this.primengConfig.ripple = true;
  }

  ngAfterViewInit() {
    this.setLeftRightcontainerStyles();
    this.hideFreeHost();
    setTimeout(() => {
      this.connectionCheckListeners();
    }, 4000)
  }

  logInCheck() {
    if ("authDetails" in localStorage) {
      let authDetails = JSON.parse(localStorage.getItem("authDetails"));
      if (authDetails['token']) {
        // this.router.navigate(['testtt/groupsPosts']);
      } else {
        this.router.navigate(['login']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  hideApplicationLoader() {
    document.getElementById('application-loader').style.display = "none";
  }

  hideFreeHost() {
    setTimeout(() => {
      $("a[title='Free Web Hosting with PHP5 or PHP7']").parent().css("display", "none");
    }, 2000);
  }

  // showSuccess() {
  //   this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
  // }

  // showInfo() {
  //   this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  // }

  // showWarn() {
  //   this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  // }

  // showError() {
  //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  // }

  // showCustom() {
  //   this.messageService.add({ key: 'custom', severity: 'info', summary: 'Custom Toast', detail: 'With a Gradient' });
  // }

  // showTopLeft() {
  //   this.messageService.add({ key: 'tl', severity: 'info', summary: 'Success Message', detail: 'Order submitted' });
  // }

  // showTopCenter() {
  //   this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Info Message', detail: 'PrimeNG rocks' });
  // }

  // showConfirm() {
  //   this.messageService.clear();
  //   this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  // }

  // showMultiple() {
  //   this.messageService.addAll([
  //     { severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks' },
  //     { severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks' },
  //     { severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' }
  //   ]);
  // }

  // onConfirm() {
  //   this.messageService.clear('c');
  // }

  // onReject() {
  //   this.messageService.clear('c');
  // }

  clear() {
    this.messageService.clear();
  }

  backToOnline() {
    this.clear();
    this.messageService.add({ id: 2, severity: 'success', summary: 'Success Message', detail: 'Back to Online...' });
  }

  backToffLine() {
    this.messageService.add({ id: 2, severity: 'error', closable: false, life: 1000000000, summary: 'Error Message', detail: 'You are offine. Please check your connection...' });
  }

  connectionCheckListeners() {
    if (!navigator.onLine) {
      this.backToffLine();
    }
    window.addEventListener("online", (ev) => {
      this.backToOnline();
    });
    window.addEventListener("offline", (ev) => {
      this.backToffLine();
    })
  }

  closeToastMessage(message) {
    console.log(message);
  }

}
