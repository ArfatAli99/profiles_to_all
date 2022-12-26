import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddAgencyPage } from './add-agency.page';

const routes: Routes = [
  {
    path: '',
    component: AddAgencyPage,
    // resolve: {
    //   company: HomePageResolver
    // }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddAgencyPage],
})
export class AddAgencyPageModule {}
