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

  isAuthenticated() {
    return this.serverService.isAuthenticated();
  }
}
