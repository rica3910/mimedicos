import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFichaClinicaComponent } from './info-ficha-clinica.component';

describe('InfoFichaClinicaComponent', () => {
  let component: InfoFichaClinicaComponent;
  let fixture: ComponentFixture<InfoFichaClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFichaClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFichaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
