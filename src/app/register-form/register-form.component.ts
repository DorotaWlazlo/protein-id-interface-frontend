import { Component } from '@angular/core';
import { ServerService } from '../service/server.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  constructor (public serverService: ServerService) {}
  registerForm: FormGroup;

  ngOnInit() {
   this.createForm();
  }

  createForm(){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null,[Validators.pattern(emailregex)]),
      'password': new FormControl(null, [this.checkPassword])
    })
  }

  emailErrors() {
    return this.registerForm.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' :''
  }

  checkPassword(control: { value: any; }) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.registerForm.get('password')!.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: string){
    const validation = this.registerForm.get(input)!.invalid && (this.registerForm.get(input)!.dirty || this.registerForm.get(input)!.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.password;
    const username = formData.value.username;
    this.serverService.registerUser(email, password, username).subscribe((data)=>console.log(data));
    formDirective.resetForm();
    this.registerForm.reset();
  }
}
