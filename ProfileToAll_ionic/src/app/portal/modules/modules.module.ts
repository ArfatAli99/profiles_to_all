import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModulesPage } from './modules.page';
import { ModulesPageResolver } from './modules.resolver';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    /*
    Roles id's and thier names
    1 => super admin
    2 => admin
    3 => agent
    4 => manager
    5 => traveler
     */
    path: '',
    component: ModulesPage,
    // resolve: {
    //   user: ModulesPageResolver
    // },
    // canActivate: [AuthGuardService],
    children: [
      {
        path:'',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
        canActivate: [AuthGuardService],
        data: {roles: [1,2,3,4,5]}
      },
      {
        path:'agency',
        loadChildren: () => import('./agencies/agency/agency.module').then( m => m.AgencyPageModule),
        // canActivate: [AuthGuardService],
        // data: {roles: [1,2,3,4,5]}
      },
      {
        path:'add-agency',
        loadChildren: () => import('./agencies/add-agency/add-agency.module').then( m => m.AddAgencyPageModule),
        // canActivate: [AuthGuardService],
        // data: {roles: [1,2,3,4,5]}
      },
      {
        path:'entity',
        loadChildren: () => import('./entities/entity/entity.module').then( m => m.EntityPageModule),
        canActivate: [AuthGuardService],
        data: {roles: [1,2,3,4]}
      },
      {
        path:'add-entity',
        loadChildren: () => import('./entities/add-entity/add-entity.module').then( m => m.AddEntityPageModule),
        canActivate: [AuthGuardService],
        data: {roles: [1,2,3,4]}
      }
      ,
      {
        path:'traveler',
        loadChildren: () => import('./travelers/traveler/traveler.module').then( m => m.TravelerPageModule),
        canActivate: [AuthGuardService],
        data: {roles: [1,2,3,4,5]}
      },
      {
        path:'add-traveler',
        loadChildren: () => import('./travelers/add-traveler/add-traveler.module').then( m => m.AddTravelerPageModule),
        canActivate: [AuthGuardService],
        data: {roles: [1,2,3,4,5]}
      },
      {
        path:'administrators',
        loadChildren: () => import('./administrators/administrators.module').then( m => m.AdministratorsPageModule),
        // canActivate: [AuthGuardService],
        // data: {roles: [1,2,3,4]}
      },
      {
        path:'sso',
        loadChildren: () => import('./sso/sso/sso.module').then( m => m.SsoPageModule),
        // canActivate: [AuthGuardService],
        // data: {roles: [1,2,3,4]}
      },
      {
        path:'add-sso',
        loadChildren: () => import('./sso/add-sso/add-sso.module').then( m => m.AddSsoPageModule),
        // canActivate: [AuthGuardService],
        // data: {roles: [1,2,3,4]}
      }
      
    ],
    
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModulesPage],
  providers:[ModulesPageResolver]
})
export class ModulesPageModule {}
