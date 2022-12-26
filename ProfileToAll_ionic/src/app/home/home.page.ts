import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  // deferredPrompt: any;
  // showInstallBtn: boolean = true;
  companies: any;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    // window.addEventListener('beforeinstallprompt', (e) => {
    //   console.log('beforeinstallprompt Event fired');
    //   // Prevent Chrome 67 and earlier from automatically showing the prompt
    //   e.preventDefault();
    //   // Stash the event so it can be triggered later.
    //   this.deferredPrompt = e;
    //   this.showInstallBtn = true;
    // });


  }

  ngOnInit(){
    this.http.get("/assets/data.json")
    .subscribe(
      // res => console.log(res["companies"])
      res => this.companies = res["companies"],    
    )
    // console.log(this.companies)

    // if(this.deferredPrompt === undefined){
    //   this.showInstallBtn = false;
    // }
    // console.log(this.companies)
  }


  goToDetailsView(company){
    
    // var titles = ["Merck", "Welbilt"];
    // var a = titles.indexOf(title);
    // console.log(a);
    // if(a != -1){
    //   console.log('if');
      this.router.navigate(["/portal", company]);
    // } else {
    //   console.log('else');
    //   title = 'Sorry ! not found';
    //   this.router.navigate(["/company", title]);
    // }
    
  }

}
