import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAlertaComponent } from './dialogo-alerta.component';

describe('DialogoAlertaComponent', () => {
  let component: DialogoAlertaComponent;
  let fixture: ComponentFixture<DialogoAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
