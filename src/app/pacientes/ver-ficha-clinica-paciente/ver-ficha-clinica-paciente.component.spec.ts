import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFichaClinicaPacienteComponent } from './ver-ficha-clinica-paciente.component';

describe('VerFichaClinicaPacienteComponent', () => {
  let component: VerFichaClinicaPacienteComponent;
  let fixture: ComponentFixture<VerFichaClinicaPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFichaClinicaPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFichaClinicaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
