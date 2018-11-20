import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDiagnosticoComponent } from './alta-diagnostico.component';

describe('AltaDiagnosticoComponent', () => {
  let component: AltaDiagnosticoComponent;
  let fixture: ComponentFixture<AltaDiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
