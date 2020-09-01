import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit,OnDestroy {

  userName:string;
  password:string;
  constructor(private router: Router,
    private loginService:LoginServiceService) { }

  ngOnInit(): void {
    if(this.loginService.getLoggedInstate()){
      this.router.navigate(['/home']);   
    }
  }

  ngOnDestroy(){
 // this.loginService.checkLogInStateAndNavigate();
  }

  validateLogin(loginForm:NgForm){
   if(this.userName && this.password){
     this.loginService.setLoggedInState(true);
   this.router.navigate(['/home']);
   }
  }



}
