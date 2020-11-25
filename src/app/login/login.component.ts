import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from '@app/common/ngx-loader/lib/public_api';
import { AuthService } from '@app/services/auth.service';
import { MessageService } from 'primeng/api';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  userName: string;
  password: string;
  showLoading:boolean = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes.threeBounce;
  constructor(private router: Router,
    private loginService: LoginServiceService,
    public messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
   
  }

  validateLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this.showLoading = true;
      let endPoint = 'User/login';
      console.log('login form', loginForm.value);
      this.loginService.logIn(endPoint, loginForm.value).subscribe(resp => {
        this.showLoading = false;
        this.authService.setAuthDetails(resp);
        this.router.navigate(['/home']);
      },(error)=>{
        this.showLoading = false;
        this.messageService.add({severity:'error', summary: 'Error Message', detail:error.message});
      });
    }
  }
}
