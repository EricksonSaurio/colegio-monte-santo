import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { UserGuard } from '../guards/user-guard.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserGuard', () => {
  let guard: UserGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UserGuard, AuthService]
    });
    guard = TestBed.inject(UserGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí para verificar el comportamiento del guard
});
