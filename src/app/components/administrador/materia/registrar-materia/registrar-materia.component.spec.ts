import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMateriaComponent } from './registrar-materia.component';

describe('RegistrarMateriaComponent', () => {
  let component: RegistrarMateriaComponent;
  let fixture: ComponentFixture<RegistrarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
