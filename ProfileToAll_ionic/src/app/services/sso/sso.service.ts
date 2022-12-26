import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SsoService {
  url = environment.url;
  constructor(
    private http: HttpClient,
  ) { }

  add(data) {
    return this.http.post(`${this.url}/sso/add`, data)
      .pipe(
        tap(res => {
          console.log(res)
        }),
        catchError(e => {
          // this.showAlert(e.error.msg.originalError.info.message);
          throw new Error(e);
        })
      );
  }
  get() {
    return this.http.get(`${this.url}/sso/getList`)
      .pipe(
        tap(res => {
          console.log(res)
        }),
        catchError(e => {
          // this.showAlert(e.error.msg.originalError.info.message);
          throw new Error(e);
        })
      );
  }
  changeStatus(data) {
    return this.http.post(`${this.url}/sso/changeStatus`,data)
      .pipe(
        tap(res => {
          console.log(res)
        }),
        catchError(e => {
          // this.showAlert(e.error.msg.originalError.info.message);
          throw new Error(e);
        })
      );
  }
}
