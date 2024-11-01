import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../src/app/services/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent {
  constructor(
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get usuario() {
    console.log('Usuario a eliminar:', this.data.usuario); // Verifica que el usuario tenga un `usuario_id` y `nombre`
    return this.data.usuario;
  }

  onDelete(): void {
    console.log("Ejecutando eliminación..."); // Confirmación de ejecución
    this.usuarioService.eliminarUsuario(this.usuario.usuario_id).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response); // Confirmación de eliminación
        this.dialogRef.close(true); // Enviar `true` para confirmar eliminación
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  closeDialog(): void {
    console.log("Cierre sin eliminar"); // Confirmación de cierre
    this.dialogRef.close(); // Cierra el modal sin realizar ninguna acción
  }
}
