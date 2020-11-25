import { Component, OnInit, AfterViewInit, Output,EventEmitter } from '@angular/core';
import { HttpService } from '@app/interceptors/http.service';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.less']
})
export class TopBannerComponent implements OnInit,AfterViewInit {

  @Output('topviewIntiation')topviewIntiation = new EventEmitter<any>();
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    // this.httpService.httpGet('User/1b892fec-152d-4a4b-8510-b00a58046b25/UserDetails').subscribe((response)=>{
    //  console.log(response);
    // },(error)=>{
    //   console.log(error);
    // })
  }

  ngAfterViewInit(){
  this.topviewIntiation.emit();
  }
}
