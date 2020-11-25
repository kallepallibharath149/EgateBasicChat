import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

import { finalize } from 'rxjs/operators';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';


// import { SharedService } from 'src/app/shared/shared.service';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
    requestCount = 0;
    constructor(private authService: AuthService,
        private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = request.url;
        let logIndex = url.indexOf('login');
        if (logIndex < 0) {
            if ("authDetails" in localStorage) {
                let authDetails = JSON.parse(localStorage.getItem("authDetails"));
                if (authDetails['data']['token']) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': authDetails['data']['token']
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
                this.requestCount--;
                if (this.requestCount === 0) {
                    // this.sharedService.displayLoader(false);
                }
            }));

    }
}
