import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor() { }

  logout() {
  }

  getToken() {
  }

  isAuthenticated() {
    return false
  }

  signInUser(name: string, password: string) {

  }
}
