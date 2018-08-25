import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDetCitaComponent } from './alta-det-cita.component';

describe('AltaDetCitaComponent', () => {
  let component: AltaDetCitaComponent;
  let fixture: ComponentFixture<AltaDetCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDetCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDetCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
