import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { ServerService } from '../service/server.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockServerService: jasmine.SpyObj<ServerService>;

  beforeEach(() => {
    mockServerService = jasmine.createSpyObj('ServerService', ['signInUser']);
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, BrowserAnimationsModule ],
      providers: [
        { provide: ServerService, useValue: mockServerService }
      ]
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockServerService.router = jasmine.createSpyObj('Router', ['navigate']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
  });

  it('should call createForm on ngOnInit', () => {
    spyOn(component, 'createForm');
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
  });

  it('should call serverService.signInUser on form submission', fakeAsync(() => {
     const mockFormValue = { email: 'test@example.com', password: 'password123' };
     const mockLoginDirective: any = { resetForm: jasmine.createSpy('resetForm') };


    mockServerService.signInUser.and.returnValue(of({ token: 'mockToken', username: 'mockUsername', email: 'test@example.com' }));
    component.loginForm.setValue(mockFormValue);

    component.onSubmit(component.loginForm, mockLoginDirective);
    tick();

    expect(mockServerService.signInUser).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(localStorage.getItem('token')).toEqual('mockToken');
    expect(localStorage.getItem('username')).toEqual('mockUsername');
    expect(localStorage.getItem('email')).toEqual('test@example.com');
  }));

});
