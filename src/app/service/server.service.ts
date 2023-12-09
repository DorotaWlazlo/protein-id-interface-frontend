import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient, public router: Router) { }

  selectedFile: File;
  searchResult: any;


  getEnzymes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}search/enzymeNames`)
  }

  getDatabase(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}search/databaseNames`)
  }

  getTaxonomy(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}search/taxonomy`)
  }

  getPtm(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}search/ptmNames`)
  }

  getTolUnit(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}search/tolUnitNames`)
  }

  startSearch(formData: FormGroup, searchDirective: FormGroupDirective): Observable<any> {
    const sendFormData = new FormData();
    if (window.localStorage.getItem("username")) {
      sendFormData.append('name', window.localStorage.getItem("username")!);
      console.log(window.localStorage.getItem("username"))
      console.log(formData.value.enzyme)
      sendFormData.append('email', window.localStorage.getItem("email")!);
    } else {
      sendFormData.append('name', formData.value.username);
      console.log(formData.value.username)
      console.log("here")
      sendFormData.append('email', formData.value.email);
    }
    
    sendFormData.append('title', formData.value.title);
    sendFormData.append('databaseName', formData.value.database);
    sendFormData.append('enzyme', formData.value.enzyme);
    sendFormData.append('missedCleavages', formData.value.clevages);
    sendFormData.append('ptmFix', formData.value.fixed);
    sendFormData.append('ptmVar', formData.value.variable);
    sendFormData.append('pepTol', formData.value.peptide);
    sendFormData.append('pepTolUnit', formData.value.peptideUnit);
    sendFormData.append('fragTol', formData.value.ms);
    sendFormData.append('fragTolUnit', formData.value.msUnit);
    sendFormData.append('taxonomy', formData.value.taxonomy);
    sendFormData.append('file', this.selectedFile);

    let headers = this.addAuthHeader()
    return this.http.post<any>(`${environment.apiUrl}search/`, sendFormData, {headers: headers});
  }

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
    this.router.navigate(['/']);
    window.location.reload();
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  isAuthenticated() {
    return this.getToken() !== null ? true : false;
  }

  getSearches(): Observable<any[]> {
    let username = window.localStorage.getItem("username")
    console.log(username)
    let headers = {"Authorization": "Bearer " + this.getToken()}
    const sendFormData = new FormData();
    sendFormData.append('username', username!)
    return this.http.post<any[]>(`${environment.apiUrl}auth/searches`, sendFormData, {headers: headers})
  }

  addAuthHeader() {
    let headers = {};

    if (this.isAuthenticated()) {
      headers = {"Authorization": "Bearer " + this.getToken()}
    }

    return headers;
  }

  signInUser(name: string, password: string) {
    const body = {
      login: name,
      password: password,
    }
    return this.http.post<any>(`${environment.apiUrl}auth/login`, body);
  }

  registerUser(email: string, password: string, username: string) {
    const body = {
      email: email,
      username: username,
      password: password,
    }
    return this.http.post<any>(`${environment.apiUrl}auth/register`, body);
  }
}
