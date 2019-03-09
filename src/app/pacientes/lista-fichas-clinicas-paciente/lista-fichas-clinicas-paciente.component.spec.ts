import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFichasClinicasPacienteComponent } from './lista-fichas-clinicas-paciente.component';

describe('ListaFichasClinicasPacienteComponent', () => {
  let component: ListaFichasClinicasPacienteComponent;
  let fixture: ComponentFixture<ListaFichasClinicasPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFichasClinicasPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFichasClinicasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
