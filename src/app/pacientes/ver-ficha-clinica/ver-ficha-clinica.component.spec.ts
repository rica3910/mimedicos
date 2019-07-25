import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFichaClinicaComponent } from './ver-ficha-clinica.component';

describe('VerFichaClinicaComponent', () => {
  let component: VerFichaClinicaComponent;
  let fixture: ComponentFixture<VerFichaClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFichaClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFichaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
