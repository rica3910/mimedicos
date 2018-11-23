import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConsultaComponent } from './info-consulta.component';

describe('InfoConsultaComponent', () => {
  let component: InfoConsultaComponent;
  let fixture: ComponentFixture<InfoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
