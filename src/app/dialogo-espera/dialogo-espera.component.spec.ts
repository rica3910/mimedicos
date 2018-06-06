import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEsperaComponent } from './dialogo-espera.component';

describe('DialogoEsperaComponent', () => {
  let component: DialogoEsperaComponent;
  let fixture: ComponentFixture<DialogoEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
