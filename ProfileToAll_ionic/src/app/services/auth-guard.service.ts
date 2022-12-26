import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot ,ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 
  // private url:any;
  
  customCheck = false;
  // tocken = '';
  roles = '';
  constructor(
    public auth: AuthService,
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private helper: JwtHelperService, 
    ) {}
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   this.storage.get('access_token').then((result) => {
    //         // console.log(result);
    //         this.customCheck = result;
    //         console.log(this.customCheck);
    //   });
    // if(this.customCheck){
    //   return true;
    // }else{
    //   console.log('asas')
    //   
    //   return false;
    // }
    if( next.data['roles'] ){
      this.roles = next.data['roles'];
    }
    return new Promise((resolve, reject) => {
      this.storage.get('access_token').then((result) => {
        if(result){
          var tocken = this.helper.decodeToken(result);
          var user_role = tocken.user.pfms_role_id;
          if ( this.roles ) {
            if ( this.roles.includes(user_role) ){
              return resolve(true);              
            } else {
              this.router.navigate(["not-found"]);
            }
          }
            return resolve(true);
        } else {
          this.router.navigate(["not-found"]);
        }
        
      });
        
    })
  }
  // canActivate(): boolean {
  //   console.log(this.auth.isAuthenticated());
  //   this.storage.get('access_token').then((result) => {
  //     // console.log(result);
  //   });
  //   // if(!this.auth.isAuthenticated()){
  //   //   var  url = document.URL.split('/');
  //   //   var url3 = url[url.length-2]
  //   //   this.router.navigate(["/portal/"+url3]);
  //   // }
  //   return this.auth.isAuthenticated();
  // }
  // canActivateChild(): boolean {
  //   return this.canActivate();
  // }
}
