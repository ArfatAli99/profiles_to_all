import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {
  // private user: Observable<any[]>;
  private user: any;
  active_tab = ''
  constructor(    
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.user = await this.authService.getUserInfo();
    console.log(this.user.pfms_role_id);
  }

  logout() {
    this.authService.logout();
  }
}
