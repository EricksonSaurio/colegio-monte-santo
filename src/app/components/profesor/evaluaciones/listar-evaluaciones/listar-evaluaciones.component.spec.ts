import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEvaluacionesComponent } from './listar-evaluaciones.component';

describe('ListarEvaluacionesComponent', () => {
  let component: ListarEvaluacionesComponent;
  let fixture: ComponentFixture<ListarEvaluacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEvaluacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
