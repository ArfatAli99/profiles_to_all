import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  url = environment.url;

  constructor(
    private http: HttpClient,
    private alertController: AlertController, 
  ) { }


  add(data) {
    return this.http.post(`${this.url}/agency/add`, data)
      .pipe(
        tap(res => {
          console.log(res)
        }),
        catchError(e => {
          this.showAlert(e.error.msg.originalError.info.message);
          throw new Error(e);
        })
      );
  }
  countries() {
    return this.http.get(`${this.url}/get/countries`)
      .pipe(
        tap(res => {
          console.log(res)
        }),
        catchError(e => {
          this.showAlert(e.error.msg.originalError.info.message);
          throw new Error(e);
        })
      );
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
