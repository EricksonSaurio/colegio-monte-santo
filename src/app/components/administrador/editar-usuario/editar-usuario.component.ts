import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../src/app/services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
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
export class EditarUsuarioComponent implements OnInit {
  usuario = {
    usuario_id: null,
    nombre: '',
    usuario: '',
    clave: '',
    rol_id: null,
    estado: 1
  };
  roles: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.usuario) {
      this.usuario = { ...data.usuario };
      if (this.usuario.usuario_id == null) {
        console.error("Error: usuario_id es null o undefined");
      }
    }
  }

  ngOnInit(): void {
    // Cargar la lista de roles desde el servicio
    this.usuarioService.obtenerRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.usuario.usuario_id == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede actualizar sin un ID de usuario válido.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Validar que todos los campos requeridos estén completos antes de enviar
    if (this.usuario.usuario && this.usuario.rol_id != null) {
      this.usuarioService.actualizarUsuario(this.usuario.usuario_id, this.usuario).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado',
            text: 'El usuario ha sido actualizado exitosamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.dialogRef.close(true); // Cerrar el modal y actualizar la lista de usuarios
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el usuario.',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al actualizar usuario:', error);
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
    // Cierra el modal sin realizar ninguna acción
    this.dialogRef.close();
  }
}
