import { Component, OnInit, ViewChild  } from '@angular/core';
import { SsoService } from '../../../../services/sso/sso.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
// import {ButtonsPage} from './buttons/buttons.page';
// import { Ng2TableModule } from 'ngx-datatable';


@Component({
  selector: 'app-sso',
  templateUrl: './sso.page.html',
  styleUrls: ['./sso.page.scss'],
})
export class SsoPage implements OnInit {
  @ViewChild('myTable', { static: false }) table: any;
  data: any;
  expanded: any = {};
  timeout: any;
  ColumnMode = ColumnMode;
  private user: any;
  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' },
  // ];
  rows:any;
  columns = [
    { prop: 'ssoId' },
    { name: 'name' },
    { name: 'isActive' },
    { name: 'isHidden' },
    { name: 'isDeleted' },
    { name: 'createdAt'},
    { name: 'createdBy' },
    { name: 'updatedAt' },
    { name: 'updatedBy' }
  ];

  // private data:Array<any> = [];
  constructor(
    private ssoService: SsoService,
    public loadingController: LoadingController,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    
    await this.ssoService.get().subscribe(res =>{
      this.rows = res;
      console.log(this.data);
      // loading.dismiss()
    });
    
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  async changeStatus(event,sso,column_name){
    console.log(event);
    // this.user = await this.authService.getUserInfo();
    let data = {
      value: event.detail.checked,
      sso_id: sso.sso_id,
      column_name: column_name,
      // updated_by:this.user.ez_user_id
      updated_by:602936
    }
    const loading = await this.loadingController.create({
      message: 'Loading',
      // duration: 2000
    });
    await loading.present();
    this.ssoService.changeStatus(data).subscribe(res =>{
      loading.dismiss()
    });
  }

}
