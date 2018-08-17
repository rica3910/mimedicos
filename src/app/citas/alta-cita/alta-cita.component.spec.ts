import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCitaComponent } from './alta-cita.component';

describe('AltaCitaComponent', () => {
  let component: AltaCitaComponent;
  let fixture: ComponentFixture<AltaCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
