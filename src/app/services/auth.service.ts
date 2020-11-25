import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authDetails = new BehaviorSubject<any>('initial');
    authDetailsObj:any;

    constructor(private router:Router) { }

    setAuthDetails(authDetails) {
      localStorage.setItem("authDetails", JSON.stringify(authDetails));
      this.authDetailsObj = authDetails;
      this.authDetails.next(this.authDetailsObj);  
    }

    logOutUser(){
    localStorage.clear(); 
    this.router.navigate(['login']);  
    }

    getAuthDetails():any{
      return this.authDetailsObj;
    }

}
