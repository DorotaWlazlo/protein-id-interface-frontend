import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ServerService } from '../service/server.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let mockServerService: jasmine.SpyObj<ServerService>;

  beforeEach(() => {
    mockServerService = jasmine.createSpyObj('ServerService', ['registerUser']);

    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, BrowserAnimationsModule ],
      providers: [
        { provide: ServerService, useValue: mockServerService }
      ]
    });
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm', () => {
    component.ngOnInit();
    expect(component.registerForm).toBeDefined();
  });

  it('should validate email pattern', () => {
    component.ngOnInit();
    const invalidEmail = 'invalidEmail';
    const validEmail = 'valid@email.com';

    component.registerForm.get('email')!.setValue(invalidEmail);
    expect(component.emailErrors()).toBe('Not a valid email address');

    component.registerForm.get('email')!.setValue(validEmail);
    expect(component.emailErrors()).toBe('');
  });

  it('should validate password requirements', () => {
    component.ngOnInit();
    const invalidPassword = 'password';
    const validPassword = 'Password1';

    component.registerForm.get('password')!.setValue(invalidPassword);
    expect(component.getErrorPassword()).toBe('Password needs to be at least six characters, one uppercase letter and one number');

    component.registerForm.get('password')!.setValue(validPassword);
    expect(component.getErrorPassword()).toBe('');
  });

  it('should check validation state', () => {
    component.ngOnInit();
    const controlName = 'email';

    component.registerForm.get(controlName)!.setErrors({ 'pattern': true });
    component.registerForm.get(controlName)!.markAsTouched();

    expect(component.checkValidation(controlName)).toBeTrue();

    component.registerForm.get(controlName)!.setErrors(null);
    expect(component.checkValidation(controlName)).toBeFalse();
  });

  it('should submit the form successfully', fakeAsync(() => {
    const mockFormDirective: any = { resetForm: jasmine.createSpy('resetForm') };
    const mockFormData: FormGroup = new FormGroup({
    email: new FormControl('test@email.com'),
    password: new FormControl('Password1'),
    username: new FormControl('testuser'),
    });

    mockServerService.registerUser.and.returnValue(of({}));
    
    component.onSubmit(mockFormData, mockFormDirective);
    tick();

    expect(mockFormDirective.resetForm).toHaveBeenCalled();
    expect(component.registerSucess).toBeTrue();
  }));

  it('should handle registration error', fakeAsync(() => {
    const mockFormData: FormGroup = new FormGroup({
    email: new FormControl('test@email.com'),
    password: new FormControl('Password1'),
    username: new FormControl('testuser'),
    });
    const mockFormDirective: any = { resetForm: jasmine.createSpy('resetForm') };

    const errorMessage = 'Registration failed';
    mockServerService.registerUser.and.returnValue(throwError({ error: { message: errorMessage } }));
    
    component.onSubmit(mockFormData, mockFormDirective);
    tick();

    expect(component.error).toBe(errorMessage);
    expect(component.registerSucess).toBeFalse();
  }));
});
