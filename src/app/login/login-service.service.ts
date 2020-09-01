import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loggedInState: boolean = false;

  constructor(private router: Router) { }

  getLoggedInstate():boolean{
    return this.loggedInState;
  }

  setLoggedInState(state){
    this.loggedInState = state;
    if(!state){
      this.router.navigate(['/login']);
    }   
  }

  checkLogInStateAndNavigate(){
    if(!this.loggedInState){
   //  window.location.href = 'http://localhost:4200/#/login'
    //  window.location.href =  'http://ganainteriors.freetzi.com/#/login'
    }
  }

}
