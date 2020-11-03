import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpService } from '@app/interceptors/http.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private httpClient: HttpService
  ) { }

  groupPreviewObj: any = null;

  setGroupPreviewObject(eventObj) {
    this.groupPreviewObj = eventObj;
  }

  clearGroupPreviewObject() {
    this.groupPreviewObj = null;
  }

  getAllGroups(endPoint: any): Observable<any> {
    return this.httpClient.httpGet(endPoint);
  }

  addGroupAdmin(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpPost(endPoint, body , true);
  }

  addGroupMember(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpPost(endPoint, body, true );
  }

  removeGroupMember(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpDelete(endPoint, body);
  }

  deleteGroupAdmin(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpDelete(endPoint, body);
  }

  createGroup(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpPost(endPoint, body, true);
  }

  deleteGroup(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpDelete(endPoint);
  }

  updateGroupDetails(endPoint: any,  body?): Observable<any> {
    return this.httpClient.httpUpdate(endPoint, body);
  }

  addPost(endPoint: any,  body?): Observable<any> {
    return this.httpClient.httpPost(endPoint, body);
  }

  getMembersToAdd(endPoint: any): Observable<any> {
    return this.httpClient.httpGet(endPoint);
  }

  postToGroup(endPoint: any, body:FormData): Observable<any> {
    return this.httpClient.httpFormPost(endPoint, body);
  }
}