import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ServerService } from '../service/server.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let serverServiceSpy: jasmine.SpyObj<ServerService>;
  

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ServerService', ['logout', 'isAuthenticated']);
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatToolbarModule],
      providers: [
        { provide: ServerService, useValue: spy },
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    serverServiceSpy = TestBed.inject(ServerService) as jasmine.SpyObj<ServerService>;
    serverServiceSpy.router = jasmine.createSpyObj('Router', ['navigate']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method on logOut()', () => {
    component.logOut();
    expect(serverServiceSpy.logout).toHaveBeenCalled();
  });

    it('should return username from localStorage on getUsername()', () => {
    const username = 'testuser';
    spyOn(window.localStorage, 'getItem').and.returnValue(username);

    const result = component.getUsername();

    expect(result).toEqual(username);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('username');
  });

  it('should navigate to "history" on history()', () => {
    component.history();
    expect(serverServiceSpy.router.navigate).toHaveBeenCalledWith(['history']);
  });

  it('should navigate to "/" on main()', () => {
    component.main();
    expect(serverServiceSpy.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call isAuthenticated method on isAuthenticated()', () => {
    component.isAuthenticated();
    expect(serverServiceSpy.isAuthenticated).toHaveBeenCalled();
  });

});
