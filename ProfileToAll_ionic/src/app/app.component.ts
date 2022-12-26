import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const CN = 'company_name';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  company_name: any;
  is_visited: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,    
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.authService.authenticationState.subscribe(state => {
      //   if (state) {
      //     this.storage.ready().then(() => {
      //       this.storage.get("is_visited").then((result) => {
      //         this.is_visited = result;
      //       });
      //       this.storage.get(CN).then((result) => {
      //         this.company_name = result;
      //         console.log('state changed ' + result);
  
      //         var  url = document.URL.split('/');
      //         console.log(url);
      //         var index = url.indexOf("portal");
      //         console.log(index);
      //         console.log('result '+result);
      //         var requested_company = url[index+1]
      //         // var url3 = url[url.length-2];
      //         // var  url = document.URL;
  
      //         console.log('requested_company '+requested_company)
      //         // var url3 = url.substr(url.indexOf("portal/") + 1)
      //         if ( requested_company != result && index != -1 && result != null) {
      //           console.log('url3'+requested_company);
      //           this.company_name = requested_company;
      //           this.storage.set(CN, requested_company);
      //           this.authService.logout();
      //           // this.router.navigate(['portal/' + requested_company]);
      //         } 
      //         else if(requested_company == result) {     
      //           if(this.is_visited == 0 ){
      //             this.storage.set("is_visited", 1);
      //             this.router.navigate(['portal/'+result+'/home']);
      //           }else {
      //             this.router.navigate(['portal/'+result+'/home']);
      //           }
      //         } else {
      //           this.router.navigate(['portal/'+result+'/home']);
      //         }
      //       });
      //     });
          
      //   }
      //   else {
      //     var  url = document.URL.split('/');
      //     console.log(url);
      //     var index = url.indexOf("portal");
      //     console.log(index);
      //     var requested_company = url[index+1]
      //     // var url3 = url[url.length-2];
      //     // var  url = document.URL;

      //     console.log('requested_company login'+requested_company)
      //     this.storage.ready().then(() => {
      //       this.storage.get(CN).then((result) => {
      //           this.company_name = result;
      //       });
      //     });
      //     if ( this.company_name ) {
      //       console.log('company_name '+ this.company_name)
      //       this.storage.remove(CN).then(() => { });
      //       this.storage.ready().then(() => {
      //         this.router.navigate(['portal/' + this.company_name]);
      //       });
      //     } else if(requested_company == 'http:' && index == -1){
           
      //       this.router.navigate(['not-found/'], { skipLocationChange: true });
      //     } else {
      //       console.log('sdsss');
      //       this.router.navigate(['portal/' + requested_company]);
      //     }
      //     console.log('sds');         
      //   }       
      // });
    });
  }
}
