import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrarAulaComponent } from '../registrar-aula/registrar-aula.component';
import { EditarAulaComponent } from '../editar-aula/editar-aula.component';
import Swal from 'sweetalert2';
import { AulaService } from '../../../../services/aula.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-aulas',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './listar-aulas.component.html',
  styleUrls: ['./listar-aulas.component.css']
})
export class ListarAulasComponent implements OnInit {
  aulas: any[] = [];

  constructor(private aulaService: AulaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerAulas();
  }

  obtenerAulas(): void {
    this.aulaService.getAulas().subscribe(
      (response: any) => {
        this.aulas = response;
      },
      (error) => {
        console.error('Error al obtener las aulas', error);
      }
    );
  }

  abrirModalRegistrar(): void {
    this.dialog.open(RegistrarAulaComponent, {
      width: '400px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === 'success') {
        this.obtenerAulas();
      }
    });
  }

  abrirModalEditar(aula: any): void {
    this.dialog.open(EditarAulaComponent, {
      width: '400px',
      data: aula, // Pasa los datos del aula al componente de edición
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === 'success') {
        this.obtenerAulas(); // Refresca la lista de aulas después de la edición
      }
    });
  }

  confirmarEliminarAula(aula: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el aula ${aula.nombre_aula}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarAula(aula.aula_id);
      }
    });
  }

  eliminarAula(id: number): void {
    this.aulaService.deleteAula(id).subscribe(
      () => {
        this.aulas = this.aulas.filter((aula) => aula.aula_id !== id);
        Swal.fire('Eliminado', 'El aula ha sido eliminada correctamente.', 'success');
      },
      (error) => {
        console.error('Error al eliminar el aula', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el aula.', 'error');
      }
    );
  }
}
