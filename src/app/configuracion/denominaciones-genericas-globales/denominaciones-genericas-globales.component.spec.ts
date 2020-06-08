import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominacionesGenericasGlobalesComponent } from './denominaciones-genericas-globales.component';

describe('DenominacionesGenericasGlobalesComponent', () => {
  let component: DenominacionesGenericasGlobalesComponent;
  let fixture: ComponentFixture<DenominacionesGenericasGlobalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenominacionesGenericasGlobalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenominacionesGenericasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
