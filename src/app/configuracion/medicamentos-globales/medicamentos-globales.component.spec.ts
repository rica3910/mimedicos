import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentosGlobalesComponent } from './medicamentos-globales.component';

describe('MedicamentosGlobalesComponent', () => {
  let component: MedicamentosGlobalesComponent;
  let fixture: ComponentFixture<MedicamentosGlobalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentosGlobalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
