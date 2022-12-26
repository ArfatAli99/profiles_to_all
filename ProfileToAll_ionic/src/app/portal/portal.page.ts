import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: 'portal.page.html',
  styleUrls: ['portal.page.scss'],
})
export class PortalPage implements OnInit {

  response: any;
  credentialsForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
  }

  onSubmit(company_name, company_id) {
    this.credentialsForm.value.company = company_id;
    this.authService.login(this.credentialsForm.value, company_name).subscribe();
  }

}
