import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { reject } from 'q';

const TOKEN_KEY = 'access_token';
const CN = 'company_name';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  url = environment.url;
  company_name = null;
  user = null;
  authenticationState = new BehaviorSubject(false);
 
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService, 
    private storage: Storage,
    private plt: Platform, 
    private alertController: AlertController,    
    private router: Router,
    ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.ready().then(() => {
      this.storage.get(TOKEN_KEY).then(token => {
        if (token) {
          let decoded = this.helper.decodeToken(token);
          let isExpired = this.helper.isTokenExpired(token);
          // console.log(decoded);
          // console.log(isExpired)
  
          if (!isExpired) {
            console.log("i'm in");
            this.user = decoded;
            this.authenticationState.next(true);
          } else {
            this.storage.remove(TOKEN_KEY);
          }
        }
      });
    });
  }
 
  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials, company_name) {
    return this.http.post(`${this.url}/portal/`+company_name, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.storage.set(CN, company_name);
          this.storage.set("is_visited", 0);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
          this.router.navigate(['portal/'+company_name+'/home']);
        }),
        catchError(e => {
          this.showAlert(e.error.msg.originalError.info.message);
          throw new Error(e);
        })
      );
  }
 
  logout() {    
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
    this.storage.get(CN).then(company_name => {
      this.company_name = company_name
    });
    this.storage.remove(CN).then(() => {
      this.router.navigate(['portal/'+this.company_name]);
    });    

  }
 
  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  async getUserInfo(){
    
    return new Promise((resolve, reject) =>{
      this.storage.ready().then(() => {
        this.storage.get(TOKEN_KEY).then((result) => {
          let tocken = this.helper.decodeToken(result);
          return resolve(tocken.user);
        })
      });
    })
  }
}
