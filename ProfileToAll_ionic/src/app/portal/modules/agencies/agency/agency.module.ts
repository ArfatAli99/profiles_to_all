import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgencyPage } from './agency.page';
// import { AddAgencyPage } from './add-agency/add-agency.page';
// import { AddAgencyPageModule } from './add-agency/add-agency.module';

const routes: Routes = [
  {
    path: '',
    component: AgencyPage,
    // children: [
    //   {
    //     path: 'add',
    //     loadChildren: () => import('./add-agency/add-agency.module').then( m => m.AddAgencyPageModule)
    //   },
    // ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgencyPage],
})
export class AgencyPageModule {}
