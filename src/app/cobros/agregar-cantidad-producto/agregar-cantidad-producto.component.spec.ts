import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCantidadProductoComponent } from './agregar-cantidad-producto.component';

describe('AgregarCantidadProductoComponent', () => {
  let component: AgregarCantidadProductoComponent;
  let fixture: ComponentFixture<AgregarCantidadProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCantidadProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCantidadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
