import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  response: any;
  credentialsForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      country: ['', [Validators.required]],
      company: [''],
    });
    this.route.data.subscribe(routeData => {
      this.response = routeData['company'];
    })

    
    console.log(this.response)
    // this.presentLoading();
  }

  async onSubmit(company_name, company_id) {
    const loading = await this.loadingController.create({
      message: 'Loading',
      // duration: 2000
    });
    await loading.present();
    this.credentialsForm.value.company = company_id;
    this.authService.login(this.credentialsForm.value, company_name).subscribe(res =>{
      loading.dismiss()
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      // duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    
  }

}
