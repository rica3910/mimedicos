import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCitaComponent } from './ver-cita.component';

describe('VerCitaComponent', () => {
  let component: VerCitaComponent;
  let fixture: ComponentFixture<VerCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
