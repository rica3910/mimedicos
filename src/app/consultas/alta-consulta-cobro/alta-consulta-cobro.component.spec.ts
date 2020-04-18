import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaConsultaCobroComponent } from './alta-consulta-cobro.component';

describe('AltaConsultaCobroComponent', () => {
  let component: AltaConsultaCobroComponent;
  let fixture: ComponentFixture<AltaConsultaCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaConsultaCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaConsultaCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
