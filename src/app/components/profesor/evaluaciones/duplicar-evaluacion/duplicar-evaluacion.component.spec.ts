import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarEvaluacionComponent } from './duplicar-evaluacion.component';

describe('DuplicarEvaluacionComponent', () => {
  let component: DuplicarEvaluacionComponent;
  let fixture: ComponentFixture<DuplicarEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicarEvaluacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuplicarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
