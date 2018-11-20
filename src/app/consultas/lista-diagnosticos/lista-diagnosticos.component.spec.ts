import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDiagnosticosComponent } from './lista-diagnosticos.component';

describe('ListaDiagnosticosComponent', () => {
  let component: ListaDiagnosticosComponent;
  let fixture: ComponentFixture<ListaDiagnosticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDiagnosticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDiagnosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
