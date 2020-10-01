import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanRedirectToGroupsHomeGuard implements CanActivate {
  constructor ( private activatedRoute: ActivatedRoute
    ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('routerSnapShot',window.location.href);
      console.log('routerSnapShot',state);
      console.log('routerSnapShot',next);
      if(window.location.href.indexOf("groupsPosts") !<0){
        return true;  
      } else {
        return false;
      }
    
  }
  
}
