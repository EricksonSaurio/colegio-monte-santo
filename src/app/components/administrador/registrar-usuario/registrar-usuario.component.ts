import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../src/app/services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class CrearUsuarioComponent implements OnInit {
  usuario = {
    usuario: '',
    clave: '',
    rol_id: null,
    estado: 1,
    profesor_id: null,
    alumno_id: null
  };
  roles: any[] = [];
  profesores: any[] = [];
  alumnos: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<CrearUsuarioComponent>
  ) {}

  ngOnInit(): void {
    this.usuarioService.obtenerRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al cargar los roles:', error);
      }
    );

    this.usuarioService.obtenerProfesores().subscribe(
      (data) => {
        this.profesores = data;
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );

    this.usuarioService.obtenerAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
      },
      (error) => {
        console.error('Error al cargar los alumnos:', error);
      }
    );
  }

  onRolChange(): void {
    this.usuario.profesor_id = null;
    this.usuario.alumno_id = null;
  }

  onSubmit(): void {
    if (this.usuario.usuario && this.usuario.clave && this.usuario.rol_id != null) {
      this.usuarioService.registrarUsuario(this.usuario).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado',
            text: 'El usuario se ha registrado exitosamente',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.dialogRef.close(true);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al registrar el usuario',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Por favor completa todos los campos requeridos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
