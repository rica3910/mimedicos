import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuariosEstudioComponent } from './ver-usuarios-estudio.component';

describe('VerUsuariosEstudioComponent', () => {
  let component: VerUsuariosEstudioComponent;
  let fixture: ComponentFixture<VerUsuariosEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUsuariosEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsuariosEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
