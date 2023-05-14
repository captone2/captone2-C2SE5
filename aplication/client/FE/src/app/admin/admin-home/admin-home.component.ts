import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css' ,
    //  '../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    //   '../../../assets/css/color_skins.css',
    //   '../../../assets/css/main.css'
  //   '../../../assets/css/admin/style.css',
    // '../../../assets/vendor/font-awesome/css/font-awesome.min.css'
  ]
})
export class AdminHomeComponent implements OnInit {
  url = 'assets/js/admin.js';
  loadAPI: any;
  constructor() { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
