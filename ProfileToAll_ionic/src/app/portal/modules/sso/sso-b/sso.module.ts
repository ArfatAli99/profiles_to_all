import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SsoPage } from './sso.page';
import { Ng2TableModule } from 'ngx-datatable/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: SsoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SsoPage]
})
export class SsoPageModule {}
