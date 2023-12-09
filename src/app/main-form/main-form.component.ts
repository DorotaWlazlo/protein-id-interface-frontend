import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent {
  constructor (public serverService: ServerService,
              private router: Router) {}

  searchForm: FormGroup;
  enzymes: string[];
  databases: string[];
  taxonomies: string[];
  ptms: string[];
  tolUnits: string[];
  clevages: number[] = [0,1,2,3,4,5,6,7,8,9];

  ngOnInit() {
   this.createForm();
   this.getEnzymes();
   this.getDatabase();
   this.getPtm();
   this.getTaxonomy();
   this.getTolUnit();
  }

  createForm(){
    this.searchForm = new FormGroup({
      'username': new FormControl(window.localStorage.getItem("username")),
      'email': new FormControl(window.localStorage.getItem("email")),
      'title': new FormControl(null),
      'database': new FormControl("SwissProt"),
      'taxonomy': new FormControl("Homo Sapiens"),
      'clevages': new FormControl(2),
      'enzyme': new FormControl("Trypsin"),
      'fixed': new FormControl(["Acetyl (K)"]),
      'variable': new FormControl(["Oxidation (M)"]),
      'peptide': new FormControl(5),
      'peptideUnit': new FormControl("ppm"),
      'ms': new FormControl(0.2),
      'msUnit': new FormControl("Da"),
      'file': new FormControl(null),
    })
    if (window.localStorage.getItem("username")) {
      this.searchForm.controls['username'].disable()
      this.searchForm.controls['email'].disable()
    }
  }

  getEnzymes() {
    this.serverService.getEnzymes().subscribe((data) => {
      this.enzymes = data;
    })
  }

  getDatabase() {
    this.serverService.getDatabase().subscribe((data) => {
      this.databases = data;
    })
  }

  getTaxonomy() {
    this.serverService.getTaxonomy().subscribe((data) => {
      this.taxonomies = data;
    })
  }

  getPtm() {
    this.serverService.getPtm().subscribe((data) => {
      this.ptms = data;
    })
  }

  getTolUnit() {
    this.serverService.getTolUnit().subscribe((data) => {
      this.tolUnits = data;
    })
  }

  onSubmit( formData: FormGroup, searchDirective: FormGroupDirective){
    this.router.navigate(['/result']);
    this.serverService.startSearch(formData,searchDirective).subscribe((data) => {
      this.serverService.searchResult = data;
      console.log(data)
    })
  }

  onFileSelected(event: any) {
    this.serverService.selectedFile = event.target.files[0];
  }
  
}
