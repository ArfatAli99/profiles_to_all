import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AgencyService } from '../../../../services/agency/agency.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agency',
  templateUrl: './add-agency.page.html',
  styleUrls: ['./add-agency.page.scss'],
})
export class AddAgencyPage implements OnInit {

  private user: any;
  data = '';
  agencyForm: FormGroup;
  countries: any;

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private router: Router, 
    private storage: Storage, 
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
    // if(!this.authService.isAuthenticated()){
    //     var  url = document.URL.split('/');
    //     var url3 = url[url.length-2]
    //     this.router.navigate(["/portal/"+url3]);
    //   }
    
    this.agencyService.countries().subscribe(res =>{
      this.countries =  res;
    });
    console.log(this.countries);
    this.agencyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      street_address: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      country_is_default_nationality: [false, [Validators.required]],
      phone_number: ['', [Validators.required]],
      url: ['', [Validators.required]],
      csv_delimeter: ['', [Validators.required]],
      profile_update_Email: ['', [Validators.required]],
      email_from: ['', [Validators.required]],
      smtp_server: ['', [Validators.required]],
      user_name_for_email_server: ['', [Validators.required]],
      password_for_email_server: ['', [Validators.required]],
      encryption: ['', [Validators.required]],
      circle: ['', [Validators.required]],
      wholy_own: [false, [Validators.required]],
      chain: ['', [Validators.required]],
      alias_mercant_id: [1212, [Validators.required]],
      server_to_server_password: ['', [Validators.required]],
      noShow_salt: ['', [Validators.required]],
      proxy_mercant_id: ['', [Validators.required]],
      security_sign: ['', [Validators.required]],
      active: [false, [Validators.required]],
      key: ['', [Validators.required]],
      is_faces: [false, [Validators.required]],
      pci_dss: ['', [Validators.required]],
      rail: ['', [Validators.required]],
      browser_extension: [false, [Validators.required]],
      profile_reminders: ['', [Validators.required]],
      loyalty_points: [false, [Validators.required]],
      resindence_information: [false, [Validators.required]],
      self_registration: [false, [Validators.required]],
      magnatech: [false, [Validators.required]],
      concur_polling: [false, [Validators.required]],
      created_by: [''],
      updated_by: [''],
    });
  }

  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
  }
 
  logout() {
    this.authService.logout();
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      // duration: 2000
    });
    // await loading.present();
    this.user = await this.authService.getUserInfo();
    this.agencyForm.value.created_by = this.user.ez_user_id;
    this.agencyForm.value.updated_by = this.user.ez_user_id;
    this.agencyService.add(this.agencyForm.value).subscribe(res =>{
      // loading.dismiss()
    });
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
