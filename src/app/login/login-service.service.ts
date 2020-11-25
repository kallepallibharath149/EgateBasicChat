import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/interceptors/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private router: Router,
    private httpClient: HttpService) { }

  logIn(endPoint: any, body?): Observable<any> {
    return this.httpClient.httpPost(endPoint, body, true);
  }

}
