import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})
export class AgencyPage implements OnInit {

  data = '';
  active_form = 'travel_request';
  constructor(private authService: AuthService, private router: Router, private storage: Storage, private toastController: ToastController) { }

  ngOnInit() {
    // if(!this.authService.isAuthenticated()){
    //     var  url = document.URL.split('/');
    //     var url3 = url[url.length-2]
    //     this.router.navigate(["/portal/"+url3]);
    //   }
  }

  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
  }
 
  logout() {
    this.authService.logout();
  }
 
  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
}
