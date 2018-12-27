import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDiagnosticoComponent } from './ver-diagnostico.component';

describe('VerDiagnosticoComponent', () => {
  let component: VerDiagnosticoComponent;
  let fixture: ComponentFixture<VerDiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
