import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../../../src/app/services/usuario.service';
import { CrearUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule] // Añadido MatDialogModule para el uso de diálogos
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    console.log("Cargando usuarios...");
    this.usuarioService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  abrirModalRegistrar(): void {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios(); // Recargar la lista de usuarios después de registrar uno nuevo
      }
    });
  }

  abrirModalEditar(usuario: any): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '400px',
      data: { usuario }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios(); // Recargar la lista después de editar
      }
    });
  }

  confirmarEliminarUsuario(usuario: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar al usuario: ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.usuario_id).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado con éxito', 'success');
            this.cargarUsuarios(); // Recargar la lista después de eliminar
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el usuario', 'error');
            console.error('Error al eliminar usuario:', error);
          }
        );
      }
    });
  }
}
