import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Corrige el tipo de datos que se pasa a login()
      this.authService.login(username, password).subscribe(
        (response: { token: string }) => {
          this.authService.saveToken(response.token);
          const role = this.authService.getUserRole();

          // Redirige según el rol
          if (role === 'Estudiante') {
            this.router.navigate(['/alumno/inicio']);
          } else if (role === 'Profesor') {
            this.router.navigate(['/profesor/inicio']);
          } else if (role === 'Administrador') {
            this.router.navigate(['/admin/inicio']);
          }
        },
        (error) => {
          this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
          console.error('Error de autenticación:', error);
        }
      );
    }
  }
}
