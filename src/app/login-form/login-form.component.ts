import { Component, OnInit } from '@angular/core';
import {ServerService} from "../service/server.service";
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor (public serverService: ServerService) {}

  loginForm!: FormGroup;

  ngOnInit() {
   this.createForm();
  }

  createForm(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
    const email = formData.value.email;
    const password = formData.value.password;
    this.serverService.signInUser(email, password).subscribe((data)=>console.log(data));
  }

}
