import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFichaClinicaPacienteComponent } from './editar-ficha-clinica-paciente.component';

describe('EditarFichaClinicaPacienteComponent', () => {
  let component: EditarFichaClinicaPacienteComponent;
  let fixture: ComponentFixture<EditarFichaClinicaPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFichaClinicaPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFichaClinicaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
