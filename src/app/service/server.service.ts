import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  proteins: any[];


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

  getSearchById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}search/${id}`)
  }

  startSearch(formData: FormGroup, searchDirective: FormGroupDirective): Observable<any> {
    const sendFormData = new FormData();
    if (window.localStorage.getItem("username")) {
      sendFormData.append('name', window.localStorage.getItem("username")!);
      sendFormData.append('email', window.localStorage.getItem("email")!);
    } else {
      sendFormData.append('name', formData.value.username);
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

    return this.http.post<any>(`${environment.apiUrl}search/`, sendFormData);
  }

  logout() {
    this.router.navigate(['/']).then(() => {
    window.location.reload();
    });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  isAuthenticated() {
    return this.getToken() !== null ? true : false;
  }

  getSearches(): Observable<any[]> {
    let username = window.localStorage.getItem("username")
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    const sendFormData = new FormData();
    sendFormData.append('username', username!)
    console.log(sendFormData.getAll('username'))
    return this.http.post<any[]>(`${environment.apiUrl}auth/searches`, sendFormData, {headers: headers})
  }

  addAuthHeader(headers: HttpHeaders) {
    if (this.isAuthenticated()) {
      headers = headers.append('Authorization', 'Bearer ' + this.getToken())
    }
    return headers
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
