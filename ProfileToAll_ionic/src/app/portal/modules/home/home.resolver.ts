import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class HomePageResolver implements Resolve<any> {

  url = environment.url;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,        
    private authService: AuthService,
    private storage: Storage,
    private route: ActivatedRoute
  ) { }

  resolve(route: ActivatedRouteSnapshot){
    let slug = route.params['slug'];
    return new Promise((resolve, reject) => {
      if(this.authService.isAuthenticated()){
        console.log('used in');
        return resolve(
          slug
        );
      }
      else {
        console.log('u r not logged in');
        // this.router.navigateByUrl('portal/' + slug);
        this.router.navigate(['portal/' + slug]);
      }
        
    })
    // console.log('resolver:'+slug);
        // this.storage.get('company_name').then((result) => {
        //   if (slug != result) {
        //     console.log('resolverin:'+slug);
        //     console.log('resolverres:'+result);
        //     // this.storage.set('company_name', slug);
        //     // this.authService.logout();
        //   }
        // });
      } 
  
}
