import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'portal', loadChildren: () => import('./portal/portal.module').then( m => m.PortalPageModule)
  },
  // {
  //   path: 'entity', loadChildren: () => import('./entity/entity.module').then( m => m.EntityPageModule)
  // },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundPageModule' },
  { path: 'server-error-page', loadChildren: './server-error-page/server-error-page.module#ServerErrorPagePageModule' },
  { path: 'login', loadChildren: './portal/login/login.module#LoginPageModule' },
  { path: 'add-traveler', loadChildren: './portal/modules/travelers/add-traveler/add-traveler.module#AddTravelerPageModule' },
  { path: 'traveler', loadChildren: './portal/modules/travelers/traveler/traveler.module#TravelerPageModule' },

  // { path: 'sso', loadChildren: './portal/modules/sso/sso/sso.module#SsoPageModule' },
  // { path: 'add-sso', loadChildren: './portal/modules/sso/add-sso/add-sso.module#AddSsoPageModule' },
  // { path: 'add-sso', loadChildren: './portal/modules/sso/add-sso/add-sso.module#AddSsoPageModule' },
  // { path: 'sso', loadChildren: './portal/modules/sso/sso/sso.module#SsoPageModule' },

  // { path: 'administrators', loadChildren: './portal/modules/administrators/administrators.module#AdministratorsPageModule' },


  // { path: 'modules', loadChildren: './portal/modules/modules.module#ModulesPageModule' },

  // { path: 'entity', loadChildren: './portal/entity/entity.module#EntityPageModule' },
  // { path: 'add-entity', loadChildren: './portal/entity/add-entity/add-entity.module#AddEntityPageModule' },

  // { path: 'agency', loadChildren: './portal/agency/agency.module#AgencyPageModule' },
  // { path: 'add-agency', loadChildren: './portal/agency/add-agency/add-agency.module#AddAgencyPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
