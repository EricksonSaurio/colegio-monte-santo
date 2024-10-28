import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarMateriasComponent } from './gestionar-materias.component';

describe('GestionarMateriasComponent', () => {
  let component: GestionarMateriasComponent;
  let fixture: ComponentFixture<GestionarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarMateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
