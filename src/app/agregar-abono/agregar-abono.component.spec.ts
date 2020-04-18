import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAbonoComponent } from './agregar-abono.component';

describe('AgregarAbonoComponent', () => {
  let component: AgregarAbonoComponent;
  let fixture: ComponentFixture<AgregarAbonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAbonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
