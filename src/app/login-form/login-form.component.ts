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
  error: string | null;
  hide = true;

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
    this.serverService.signInUser(email, password).subscribe(
      res => {
        console.log(res);
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem("username", res.username);
        window.localStorage.setItem("email", res.email);
        this.serverService.router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.error = err.error.message;
        this.loginForm.controls['password'].reset()
      }
    );
  }

}
