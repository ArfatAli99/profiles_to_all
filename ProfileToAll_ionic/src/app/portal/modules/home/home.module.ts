import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HomePageResolver } from './home.resolver';
import { AuthGuardService } from '../../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuardService]
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
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage],
  providers: [HomePageResolver]
})
export class HomePageModule {}
