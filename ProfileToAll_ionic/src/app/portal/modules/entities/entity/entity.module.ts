import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntityPage } from './entity.page';

const routes: Routes = [
  {
    path: '',    
    component: EntityPage,
    // children: [
    //   {
    //     path: '',
    //     component: EntityPage,
    //   },
    //   {
    //     path: 'add',
    //     loadChildren: () => import('./add-entity/add-entity.module').then( m => m.AddEntityPageModule)
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
  declarations: [EntityPage]
})
export class EntityPageModule {}
