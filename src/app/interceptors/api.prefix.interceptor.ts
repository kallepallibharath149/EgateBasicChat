import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

import { finalize } from 'rxjs/operators';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { authNotrequiredAPI } from '@app/common/global.constants';

@Injectable({
    providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
    authNotrequiredAPI: any = authNotrequiredAPI;
    constructor(private authService: AuthService,
        private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = request.url;
        let authRequired = this.checkAuthRequiredAPI(url);
        if (authRequired) {
            if ("authDetails" in localStorage) {
                let authDetails = JSON.parse(localStorage.getItem("authDetails"));
                if (authDetails['token']) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': authDetails['token']
                        }
                    });
                } else {
                    this.router.navigate(['login']);
                    return new Observable();
                }
            } else {
                this.router.navigate(['login']);
                return new Observable();
            }
        }

        return next.handle(request).pipe(
            finalize(() => {

            }));

    }

    checkAuthRequiredAPI(url: string): boolean {
        let status = false;
        this.authNotrequiredAPI.forEach(APIName => {
            if (url.indexOf(APIName) >= 0) {
                status = true;
            }
        });
        return !status;
    }
}
