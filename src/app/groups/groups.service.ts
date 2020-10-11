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
  newCreatedGroup = new BehaviorSubject<any>(false);

  createNewGroup(groupObj) {
    this.newCreatedGroup.next(groupObj);
  }

  setGroupPreviewObject(eventObj) {
    this.groupPreviewObj = eventObj;
  }

  clearGroupPreviewObject() {
    this.groupPreviewObj = null;
  }

  getAllGroups(endPoint: any): Observable<any> {
    return this.httpClient.httpGet(endPoint);
  }

  addGroupAdmin(endPoint: any, queryParams?): Observable<any> {
    return this.httpClient.httpPost(endPoint);
  }

  addGroupMember(endPoint: any, queryParams?): Observable<any> {
    return this.httpClient.httpPost(endPoint);
  }

  removeGroupMember(endPoint: any, queryParams?): Observable<any> {
    return this.httpClient.httpDelete(endPoint);
  }

  deleteGroupAdmin(endPoint: any, queryParams?): Observable<any> {
    return this.httpClient.httpDelete(endPoint);
  }

  createGroup(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpPost(endPoint, body, 'createGroup');
  }

  deleteGroup(endPoint: any, queryParams?): Observable<any> {
    return this.httpClient.httpDelete(endPoint);
  }

  updateGroupDetails(endPoint: any,  body?): Observable<any> {
    return this.httpClient.httpUpdate(endPoint, body);
  }
}