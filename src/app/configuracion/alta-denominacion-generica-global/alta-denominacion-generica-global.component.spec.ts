import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDenominacionGenericaGlobalComponent } from './alta-denominacion-generica-global.component';

describe('AltaDenominacionGenericaGlobalComponent', () => {
  let component: AltaDenominacionGenericaGlobalComponent;
  let fixture: ComponentFixture<AltaDenominacionGenericaGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDenominacionGenericaGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDenominacionGenericaGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
