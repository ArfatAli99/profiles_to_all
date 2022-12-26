import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const CN = 'company_name';

@Injectable()
export class ModulesPageResolver implements Resolve<any> {
  
  url = environment.url;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
  ) { }

  resolve(route: ActivatedRouteSnapshot){

    return new Promise((resolve, reject) => {
     
        
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
