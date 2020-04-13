import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCobroComponent } from './historial-cobro.component';

describe('HistorialCobroComponent', () => {
  let component: HistorialCobroComponent;
  let fixture: ComponentFixture<HistorialCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
