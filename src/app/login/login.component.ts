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

  signUpObj = {
    "firstName": "",

    "lastName": "",

    "city": "",

    "state": "",

    "country": "",

    "phone": "",

    "email": "",

    "password": "",

    "confirmPassword": ""
  } 

  displaySignUpModal: boolean = false;
  visibleSidebar: boolean = false;
  forgottPassword: boolean = false;
  showLoading: boolean = false;

  showWarning:boolean = false;
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
    this.showWarning = false;
    if (loginForm.valid) {
      this.showLoading = true;
      let endPoint = 'User/login';
      console.log('login form', loginForm.value);
      this.loginService.logIn(endPoint, loginForm.value).subscribe(resp => {
        this.showLoading = false;
        if (resp.success) {
          this.authService.setAuthDetails(resp.data);
          this.router.navigate(['/home']);
        }
      }, (error) => {
        this.showLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.message });
      });
    } else {
      this.showWarning = true; 
    }
  }

  createAccount(signUpForm: NgForm) {
    let endPoint = 'User/Register';
    if (signUpForm.valid) {
      this.showLoading = true;
      let signUpDetails = Object.assign({}, this.signUpObj);
      delete signUpDetails.confirmPassword;
      this.loginService.registerUser(endPoint, signUpDetails).subscribe(resp => {
        this.showLoading = false;
        if (resp.success) {
          signUpForm.reset();
          this.visibleSidebar = false;
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Profile created successfully. Please login.' });
        }
      }, (error) => {
        this.showLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.message });
      });
    }
  }

  clearSignUp(signUpForm: NgForm){
    signUpForm.reset();
    this.visibleSidebar=false
  }

  showSignUp(){
    this.visibleSidebar = true;
  }

}
