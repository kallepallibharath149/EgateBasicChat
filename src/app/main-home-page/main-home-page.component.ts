import { Component, OnInit, HostBinding, HostListener, ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { GlobalEmittingEventsService } from '../services/global-emitting-events.service';

@Component({
  selector: 'app-main-home-page',
  templateUrl: './main-home-page.component.html',
  styleUrls: ['./main-home-page.component.less']
})
export class MainHomePageComponent implements OnInit, AfterContentInit, AfterViewInit {
  element: ElementRef;
  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    console.log("scrolling...");
  }
  @HostListener('window:resize', ['$event'])
  onResize($event) {
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    this.setLeftRightcontainerStyles();

  }

  public setLeftRightcontainerStyles() {
    let topBannerHeight = 0;
    if (document.getElementById('topBanner')) {
      topBannerHeight = document.getElementById('topBanner').clientHeight + 2;
    }
    let finalHeight = window.innerHeight - topBannerHeight;
    this.renderer.setStyle(this.sideGroup.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.sideGroup2.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.leftSideContainer.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.leftSideContainer.nativeElement, 'top', topBannerHeight + 'px');
    this.renderer.setStyle(this.rightSideContainer.nativeElement, 'height', finalHeight + 'px');
    this.renderer.setStyle(this.rightSideContainer.nativeElement, 'top', topBannerHeight + 'px');
  }
  @ViewChild('leftSideContainer', { read: ElementRef, static: false }) leftSideContainer: ElementRef<HTMLElement>;
  @ViewChild('sideGroup2', { read: ElementRef, static: false }) sideGroup2: ElementRef<HTMLElement>;
  @ViewChild('sideGroup', { read: ElementRef, static: false }) sideGroup: ElementRef<HTMLElement>;
  @ViewChild('rightSideContainer', { read: ElementRef, static: false }) rightSideContainer: ElementRef<HTMLElement>;
  constructor(private _elementRef: ElementRef,
    private renderer: Renderer2,
    private globalEmitterService: GlobalEmittingEventsService) {
    this.element = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.globalEmitterService.emitcurrentNavigation('/home');
  }

  ngAfterViewInit() {
    this.setLeftRightcontainerStyles();
  }

  ngAfterContentInit() {
    //this.setLeftRightcontainerStyles();
  }

}
