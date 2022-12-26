import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PortalPage } from './portal.page';
// import { HomePage } from './home/home.page';
import { PortalPageResolver } from './portal.resolver';
// import { AgencyPage } from './agency/agency.page';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':slug',
        // component: PortalPage,
        // resolve: {
        //   company: PortalPageResolver
        // },
        children: [
          // {
          //   path: 'agency',
          //   loadChildren: () => import('./agency/agency.module').then( m => m.AgencyPageModule)
          //   // component: AgencyPage,
          //   // pathMatch: 'full'
          // },
          {
            path: '',
            // component: PortalPage,
            // resolve: {
            //   company: PortalPageResolver
            // },
            loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
            // resolve: {
            //   company: PortalPageResolver
            // },
            // canActivate: [AuthGuardService]
          },
          {
            path: 'home',
            // component: HomePage,
            loadChildren: () => import('./modules/modules.module').then( m => m.ModulesPageModule),
            // resolve: {
            //   company: PortalPageResolver
            // },
            // canActivate: [AuthGuardService]
          },
          {
            path:'not-found-login',
            loadChildren: () => import('../not-found/not-found.module').then( m => m.NotFoundPageModule)
          }
          // {
          //   path: 'entity',
          //   loadChildren: () => import('./entity/entity.module').then( m => m.EntityPageModule)
          //   // component: AgencyPage,
          //   // pathMatch: 'full'
          // },
        ]
      },
      
    ])
  ],
  declarations: [PortalPage],  
  providers: [PortalPageResolver]
})
export class PortalPageModule {}
