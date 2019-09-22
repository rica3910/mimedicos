import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRecetaComponent } from './alta-receta.component';

describe('AltaRecetaComponent', () => {
  let component: AltaRecetaComponent;
  let fixture: ComponentFixture<AltaRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
