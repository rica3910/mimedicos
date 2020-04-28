import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstudioComponent } from './alta-estudio.component';

describe('AltaEstudioComponent', () => {
  let component: AltaEstudioComponent;
  let fixture: ComponentFixture<AltaEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
