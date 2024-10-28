import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eliminar-actividad',
  templateUrl: './eliminar-actividad.component.html',
  styleUrls: ['./eliminar-actividad.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class EliminarActividadComponent {
  actividad: any;

  constructor(
    public dialogRef: MatDialogRef<EliminarActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.actividad = data; // Recibir la actividad a eliminar
  }

  closeDialog(): void {
    // Cerrar el diálogo sin hacer nada
    this.dialogRef.close();
  }

  onDelete(): void {
    // Confirmar la eliminación
    this.dialogRef.close(true); // Pasar 'true' para indicar que se debe eliminar
  }
}
