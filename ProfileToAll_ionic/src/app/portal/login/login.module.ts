import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginPageResolver } from './login.resolver'

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    resolve: {
      company: LoginPageResolver
    },
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
  declarations: [LoginPage],
  providers: [LoginPageResolver]
})
export class LoginPageModule {}
