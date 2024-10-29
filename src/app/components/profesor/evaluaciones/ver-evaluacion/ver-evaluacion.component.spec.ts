import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEvaluacionComponent } from './ver-evaluacion.component';

describe('VerEvaluacionComponent', () => {
  let component: VerEvaluacionComponent;
  let fixture: ComponentFixture<VerEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEvaluacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
