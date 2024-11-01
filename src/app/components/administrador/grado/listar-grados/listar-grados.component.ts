import { Component, OnInit } from '@angular/core';
import { GradoService } from '../../../../../../src/app/services/grado.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrarGradoComponent } from '../registrar-grado/registrar-grado.component';
import Swal from 'sweetalert2';
import { EditarGradoComponent } from '../editar-grado/editar-grado.component';

@Component({
  selector: 'app-listar-grados',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RegistrarGradoComponent],
  templateUrl: './listar-grados.component.html',
  providers: [GradoService]
})
export class ListarGradosComponent implements OnInit {
  grados: any[] = [];

  constructor(private gradoService: GradoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerGrados();
  }

  obtenerGrados(): void {
    this.gradoService.getGrados().subscribe(
      (data) => {
        this.grados = data;
      },
      (error) => {
        console.error('Error al obtener los grados', error);
      }
    );
  }

  abrirModalRegistrar() {
    const dialogRef = this.dialog.open(RegistrarGradoComponent, {
      width: '400px', // Puedes ajustar el ancho del modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerGrados(); // Actualiza la lista si se registró un nuevo grado
      }
    });
  }

  abrirModalEditar(grado: any) {
    const dialogRef = this.dialog.open(EditarGradoComponent, {
      width: '400px', // Ajusta el ancho si es necesario
      data: { grado } // Pasa el grado como datos al modal
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerGrados(); // Refresca la lista si se editó el grado
      }
    });
  }
  confirmarEliminarGrado(grado: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar el grado ${grado.nombre_grado}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarGrado(grado.grado_id);
      }
    });
  }

  eliminarGrado(gradoId: number): void {
    this.gradoService.deleteGrado(gradoId).subscribe(
      () => {
        Swal.fire('Eliminado', 'El grado ha sido eliminado exitosamente.', 'success');
        this.obtenerGrados(); // Actualiza la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el grado', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el grado.', 'error');
      }
    );
  }
}
