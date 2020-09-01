import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ModalOpenCanDeactivateGuardGuard implements CanDeactivate<any> {
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
  }
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let com = component;
   let count = this.modalService.hasOpenModals();
   if(count){
     this.modalService.dismissAll('');
     return false;
   } else{
    return true;
   }

  }
  
}
