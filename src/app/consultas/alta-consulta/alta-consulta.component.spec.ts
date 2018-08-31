import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaConsultaComponent } from './alta-consulta.component';

describe('AltaConsultaComponent', () => {
  let component: AltaConsultaComponent;
  let fixture: ComponentFixture<AltaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
