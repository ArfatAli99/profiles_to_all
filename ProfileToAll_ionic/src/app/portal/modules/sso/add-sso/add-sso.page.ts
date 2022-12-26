import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { SsoService } from '../../../../services/sso/sso.service';
import { LoadingController } from '@ionic/angular';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-add-sso',
  templateUrl: './add-sso.page.html',
  styleUrls: ['./add-sso.page.scss'],
})
export class AddSsoPage implements OnInit {

  ssoForm: FormGroup;
  ColumnMode = ColumnMode;
  private user: any;
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ssoService: SsoService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.ssoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sso_fields: this.formBuilder.array([this.sso_fields])   ,
      created_by:'',   
      updated_by:'',   
    });
    console.log(this.ssoForm);
  }
  get sso_fields(): FormGroup {
    return this.formBuilder.group({
      label: '',
      type: '',
      input_name: '',
      isRequired: false,
      validation_regex: '',
      options: this.formBuilder.array([this.options])
    });
  }
  get options(): FormGroup {
    return this.formBuilder.group({
      option_value: ""
    });
  }

  addSelectOption(sso_field) {
    sso_field.get("options").push(this.options);
  }

  deleteSelectOption(sso_field, index) {
    sso_field.get("options").removeAt(index);
  }
  addSSO_filed() {
    (this.ssoForm.get("sso_fields") as FormArray).push(this.sso_fields);
  }

  deleteSSO_filed(index) {
    (this.ssoForm.get("sso_fields") as FormArray).removeAt(index);
  }
  async onSubmit(){
    
    const loading = await this.loadingController.create({
      message: 'Loading',
      // duration: 2000
    });
    // await loading.present();
    this.user = await this.authService.getUserInfo();
    this.ssoForm.value.created_by = this.user.ez_user_id;
    this.ssoForm.value.updated_by = this.user.ez_user_id;
    this.ssoService.add(this.ssoForm.value).subscribe(res =>{
      // loading.dismiss()
    });
  }

}
