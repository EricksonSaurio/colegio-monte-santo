import { TestBed } from '@angular/core/testing';
import { AlumnoComponent } from './alumno.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AlumnoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoComponent], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}), 
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AlumnoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
