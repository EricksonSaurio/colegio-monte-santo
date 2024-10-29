import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarEvaluacionComponent } from './calificar-evaluacion.component';

describe('CalificarEvaluacionComponent', () => {
  let component: CalificarEvaluacionComponent;
  let fixture: ComponentFixture<CalificarEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarEvaluacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalificarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
