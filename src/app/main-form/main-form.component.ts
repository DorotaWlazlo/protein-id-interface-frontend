import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent {
  srcResult: any;
  searchForm!: FormGroup;

  ngOnInit() {
   this.createForm();
  }

  createForm(){
    this.searchForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'title': new FormControl(null)
    })
  }

  onSubmit( formData: FormGroup, searchDirective: FormGroupDirective){
    
  }

  onFileSelected() {
  const inputNode: any = document.querySelector('#file');

  if (typeof (FileReader) !== 'undefined') {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.srcResult = e.target.result;
    };

    reader.readAsArrayBuffer(inputNode.files[0]);
  }
}
}
