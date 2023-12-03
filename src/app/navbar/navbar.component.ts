import { Component } from '@angular/core';
import {ServerService} from "../service/server.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor (public serverService: ServerService) {}

  logOut(){
    this.serverService.logout();
  }

  getUsername() {
    return window.localStorage.getItem("username");
  }

  history() {
    this.serverService.router.navigate(['history']);
  }

  main() {
    this.serverService.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.serverService.isAuthenticated();
  }
}
