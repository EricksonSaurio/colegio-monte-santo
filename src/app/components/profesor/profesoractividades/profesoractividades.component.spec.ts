import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorActividadesComponent } from './profesoractividades.component';


describe('ProfesorActividadesComponent', () => {
  let component: ProfesorActividadesComponent;
  let fixture: ComponentFixture<ProfesorActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesorActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
