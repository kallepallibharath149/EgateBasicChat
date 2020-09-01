import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
// import { AuthenticationService } from './core/auth/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
      constructor(private authService: AuthService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUser;
  
            // request = request.clone({
            //     setHeaders: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',                                                   
            //     }               
            // }); 
            if(currentUser?.authCode){
                request=request.clone({ setParams:{
                    'authCode':currentUser.authCode
                }}); 
            }   

        return next.handle(request);
    }
}
