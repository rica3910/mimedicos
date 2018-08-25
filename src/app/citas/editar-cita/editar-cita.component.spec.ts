import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCitaComponent } from './editar-cita.component';

describe('EditarCitaComponent', () => {
  let component: EditarCitaComponent;
  let fixture: ComponentFixture<EditarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
