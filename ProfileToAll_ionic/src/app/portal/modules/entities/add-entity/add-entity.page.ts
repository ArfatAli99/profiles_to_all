import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.page.html',
  styleUrls: ['./add-entity.page.scss'],
})
export class AddEntityPage implements OnInit {

  entityForm: FormGroup;  
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.entityForm = this.formBuilder.group({
      form_of_payments: this.formBuilder.array([
        this.formBuilder.group({
          card_type: '',
          credit_card_number: '',
          expiration: '',
          remark: '',
          using_status: '',
        })
      ]),
      airline_company_program: this.formBuilder.array([
        this.formBuilder.group({
          airline: '',
          publish_as: ['0']
        })
      ]),
      hotel_chains: this.formBuilder.array([
        this.formBuilder.group({
          hotel_chain: '',
          rate_code: '',
          customer_request: ''
        })
      ]),
      entity_company: this.formBuilder.array([
        this.formBuilder.group({
          company: '',
          corporate_disc_no: '',
          customer_req: '',
          billing_no: '',
          prefered_rental: ''
        })
      ]),
    });
  }
  get formOfPayments() {
    return this.entityForm.get('form_of_payments') as FormArray;
  }

  get airlineCompanyProgram() {
    return this.entityForm.get('airline_company_program') as FormArray;
  }
  get hotelChains() {
    return this.entityForm.get('hotel_chains') as FormArray;
  }
  get entityCompany() {
    return this.entityForm.get('entity_company') as FormArray;
  }

  addFormOfPayments() {
    this.formOfPayments.push(
      this.formBuilder.group({
        card_type: '',
        credit_card_number: '',
        expiration: '',
        remark: '',
        using_status: '',
      })
    );
  }

  deleteFormOfPayments(index) {
    this.formOfPayments.removeAt(index);
  }
  
  addAirlineCompanyProgram() {
    this.airlineCompanyProgram.push(
      this.formBuilder.group({
        airline: '',
        publish_as: ''
      })
    );
  }

  deleteAirlineCompanyProgram(index) {
    this.airlineCompanyProgram.removeAt(index);
  }
  
  addHotelChains() {
    this.hotelChains.push(
      this.formBuilder.group({
        hotel_chain: '',
        rate_code: '',
        customer_request: ''
      })
    );
  }

  deleteHotelChains(index) {
    this.hotelChains.removeAt(index);
  }
  
  addEntityCompany() {
    this.entityCompany.push(
      this.formBuilder.group({
        company: '',
        corporate_disc_no: '',
        customer_req: '',
        billing_no: '',
        prefered_rental: ''
      })
    );
  }

  deleteEntityCompany(index) {
    this.entityCompany.removeAt(index);
  }

}
