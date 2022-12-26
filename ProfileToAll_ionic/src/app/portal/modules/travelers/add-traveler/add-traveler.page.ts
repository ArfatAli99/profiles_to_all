import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-traveler',
  templateUrl: './add-traveler.page.html',
  styleUrls: ['./add-traveler.page.scss'],
})
export class AddTravelerPage implements OnInit {

  travelerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.travelerForm = this.formBuilder.group({
      credit_cards: this.formBuilder.array([
        this.formBuilder.group({
          card_type: '',
          credit_card_no: '',
          expiration: '',
          remark: ''
        })
      ]),
      arranger_assistances: this.formBuilder.array([
        this.formBuilder.group({
          arranger_assistance: '',
        })
      ]),
      approvers: this.formBuilder.array([
        this.formBuilder.group({
          approver: ''
        })
      ]),
      emergency_contacts: this.formBuilder.array([
        this.formBuilder.group({
          first_name: '',
          email: '',
          surname: '',
          phone: ''
        })
      ]),
      frequent_layers: this.formBuilder.array([
        this.formBuilder.group({
          airline: '',
          number: '',
          pin: ''
        })
      ]),
      hotel_programs: this.formBuilder.array([
        this.formBuilder.group({
          hotel_guarantee: '',
          hotel_chain: '',
          customer_no: '',
          customer_request: ''
        })
      ]),
      car_programs: this.formBuilder.array([
        this.formBuilder.group({
          guarantee_rental_car: '',
          company: '',
          costomer_no: '',
          customer_request: '',
          special_request: ''
        })
      ]),
      rail_cards: this.formBuilder.array([
        this.formBuilder.group({
          card: '',
          number: '',
          expiration: '',
          collect_points: '',
          rail_class: '',
          valid_from_station: '',
          valid_to_station: ''
        })
      ]),
      traveler_passports: this.formBuilder.array([
        this.formBuilder.group({
          nationality: '',
          passport_no: '',
          issue_date: '',
          issue_place: '',
          issue_country: '',
          expires: '',
          primary_passport: ''
        })
      ]),
      visa_informations: this.formBuilder.array([
        this.formBuilder.group({
          country: '',
          number: '',
          issue_date: '',
          expires: '',
          entry_type: '',
          linked_passport: ''
        })
      ]),
      identification_cards: this.formBuilder.array([
        this.formBuilder.group({
          country: '',
          number: '',
          issue_date: '',
          expires: ''
        })
      ]),
    });
  }

  get creditCards() {
    return this.travelerForm.get('credit_cards') as FormArray;
  }
  get arrangerAssistances() {
    return this.travelerForm.get('arranger_assistances') as FormArray;
  }
  get Approvers() {
    return this.travelerForm.get('approvers') as FormArray;
  }
  get EmergencyContacts() {
    return this.travelerForm.get('emergency_contacts') as FormArray;
  }
  get FrequentLayers() {
    return this.travelerForm.get('frequent_layers') as FormArray;
  }
  get HotelPrograms() {
    return this.travelerForm.get('hotel_programs') as FormArray;
  }
  get CarPrograms() {
    return this.travelerForm.get('car_programs') as FormArray;
  }
  get RailCards() {
    return this.travelerForm.get('rail_cards') as FormArray;
  }
  get TravelerPassports() {
    return this.travelerForm.get('traveler_passports') as FormArray;
  }
  get VisaInformations() {
    return this.travelerForm.get('visa_informations') as FormArray;
  }
  get IdentificationCards() {
    return this.travelerForm.get('identification_cards') as FormArray;
  }

  addCreditCard() {
    this.creditCards.push(
      this.formBuilder.group({
        card_type: '',
        credit_card_no: '',
        expiration: '',
        remark: '',
      })
    );
  }

  deleteCreditCard(index) {
    this.creditCards.removeAt(index);
  }
  
  addArrangerAssistance() {
    this.arrangerAssistances.push(
      this.formBuilder.group({
        arranger_assistance: '',
      })
    );
  }

  deleteArrangerAssistances(index) {
    this.arrangerAssistances.removeAt(index);
  }
  addApprover() {
    this.Approvers.push(
      this.formBuilder.group({
        approver: '',
      })
    );
  }

  deleteApprovers(index) {
    this.Approvers.removeAt(index);
  }

  addEmergencyContact() {
    this.EmergencyContacts.push(
      this.formBuilder.group({
        first_name: '',
          email: '',
          surname: '',
          phone: ''
      })
    );
  }

  deleteEmergencyContact(index) {
    this.EmergencyContacts.removeAt(index);
  }
  
  addFrequentLayer() {
    this.FrequentLayers.push(
      this.formBuilder.group({
        airline: '',
        number: '',
        pin: ''
      })
    );
  }

  deleteFrequentLayer(index) {
    this.FrequentLayers.removeAt(index);
  }

  addHotelProgram() {
    this.HotelPrograms.push(
      this.formBuilder.group({
        hotel_guarantee: '',
        hotel_chain: '',
        customer_no: '',
        customer_request: ''
      })
    );
  }

  deleteHotelProgram(index) {
    this.HotelPrograms.removeAt(index);
  }
  
  addCarProgram() {
    this.CarPrograms.push(
      this.formBuilder.group({
        guarantee_rental_car: '',
        company: '',
        costomer_no: '',
        customer_request: '',
        special_request: ''
      })
    );
  }

  deleteCarProgram(index) {
    this.CarPrograms.removeAt(index);
  }
  
  addRailCard() {
    this.RailCards.push(
      this.formBuilder.group({
        card: '',
        number: '',
        expiration: '',
        collect_points: '',
        rail_class: '',
        valid_from_station: '',
        valid_to_station: ''
      })
    );
  }

  deleteRailCard(index) {
    this.RailCards.removeAt(index);
  }
  addTravelerPassport() {
    this.TravelerPassports.push(
      this.formBuilder.group({
        nationality: '',
        passport_no: '',
        issue_date: '',
        issue_place: '',
        issue_country: '',
        expires: '',
        primary_passport: ''
      })
    );
  }

  deleteTravelerPassport(index) {
    this.TravelerPassports.removeAt(index);
  }

  addVisaInformation() {
    this.VisaInformations.push(
      this.formBuilder.group({
        country: '',
        number: '',
        issue_date: '',
        expires: '',
        entry_type: '',
        linked_passport: ''
      })
    );
  }

  deleteVisaInformation(index) {
    this.VisaInformations.removeAt(index);
  }
  addIdentificationCard() {
    this.IdentificationCards.push(
      this.formBuilder.group({
        country: '',
        number: '',
        issue_date: '',
        expires: ''
      })
    );
  }

  deleteIdentificationCard(index) {
    this.IdentificationCards.removeAt(index);
  }

}
