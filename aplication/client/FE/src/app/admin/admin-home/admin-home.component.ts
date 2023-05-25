import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
  currentRoute: string;
  showAdminBoard = false;
  showEmployeeBoard = false;
  isLoggedIn = false;
  private roles: string[];
  idAccount: any;
  username: string;
  constructor(private router: Router, private tokenStorageService: TokenStorageService) { 
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');

      this.username = user.displayName;
      console.log(user.id);
      this.idAccount = user.id;
    }
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = ('/login');
  }
}
