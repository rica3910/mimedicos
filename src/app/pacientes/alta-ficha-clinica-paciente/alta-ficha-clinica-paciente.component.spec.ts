import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaFichaClinicaPacienteComponent } from './alta-ficha-clinica-paciente.component';

describe('AltaFichaClinicaPacienteComponent', () => {
  let component: AltaFichaClinicaPacienteComponent;
  let fixture: ComponentFixture<AltaFichaClinicaPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaFichaClinicaPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaFichaClinicaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
