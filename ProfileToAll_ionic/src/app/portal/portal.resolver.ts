import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const CN = 'company_name';

@Injectable()
export class PortalPageResolver implements Resolve<any> {
  
  url = environment.url;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
  ) { }

  resolve(route: ActivatedRouteSnapshot){
    let slug = route.params['slug'];
    // console.log('resolver:'+slug);

    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/portal/`+slug).subscribe(
        res => {
          // this.storage.get(CN).then(company_name => {
          //   console.log(company_name);
          //   if(company_name == slug && company_name != undefined){
          //     // this.router.navigate(["portal/"+slug+"/home"]);
          //   }
          //   else if(company_name != undefined){
          //     // this.router.navigate(["portal/"+slug]);
          //   }
          //   // else{
          //   //   this.router.navigate(["not-found"]);
          //   // }
          // });
          
          return resolve(
            res
          )
        },
        error => {
          if(error.status == 404){
            this.router.navigate(["not-found"], { skipLocationChange: true });
          }
          if(error.status == 500){
            this.router.navigate(["server-error-page"], { skipLocationChange: true });
          }
          // this.showAlert(error.error.message);
          // throw new Error(error);
        }
        );
        
    })
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
