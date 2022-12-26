import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

 
@Injectable({
  providedIn: 'root'
})
export class HomeAuthGuardService implements CanActivate {
 
  // private url:any;
  

  constructor(public auth: AuthService,private router: Router,private storage: Storage,) {}
 
  canActivate(): boolean {
    if(!this.auth.isAuthenticated()){
      var  url = document.URL.split('/');
      var url3 = url[url.length-2]
      this.router.navigate(["/portal/"+url3]);
      console.log('HomeAuthGuardService'+url3);
    }
    return this.auth.isAuthenticated();
  }
}
