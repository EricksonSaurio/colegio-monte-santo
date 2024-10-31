import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        {
          provide: AuthService,
          useValue: {
            getUserRole: jasmine.createSpy('getUserRole').and.returnValue('alumno') // Define el rol para la prueba
          }
        }
      ]
    });

    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user role matches the required role', () => {
    (authService.getUserRole as jasmine.Spy).and.returnValue('alumno');
    const route: any = { data: { role: 'alumno' } };
    const state: any = {};

    expect(guard.canActivate(route, state)).toBeTrue();
  });

  it('should deny access if user role does not match the required role', () => {
    (authService.getUserRole as jasmine.Spy).and.returnValue('profesor');
    const route: any = { data: { role: 'alumno' } };
    const state: any = {};

    spyOn(router, 'navigate');
    expect(guard.canActivate(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
