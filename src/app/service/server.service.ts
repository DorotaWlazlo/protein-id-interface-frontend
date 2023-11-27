import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }

  selectedFile: File;
  searchResult: any;

  getEnzymes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}enzymeNames`)
  }

  getDatabase(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}databaseNames`)
  }

  getTaxonomy(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}taxonomy`)
  }

  getPtm(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}ptmNames`)
  }

  getTolUnit(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}tolUnitNames`)
  }

  startSearch(formData: FormGroup, searchDirective: FormGroupDirective): Observable<any> {
    const sendFormData = new FormData();
    sendFormData.append('name', formData.value.username);
    sendFormData.append('email', formData.value.email);
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

    return this.http.post<any>(`${environment.apiUrl}`, sendFormData);
  }

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
