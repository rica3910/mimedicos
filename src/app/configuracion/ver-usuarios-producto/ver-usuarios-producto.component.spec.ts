import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuariosProductoComponent } from './ver-usuarios-producto.component';

describe('VerUsuariosProductoComponent', () => {
  let component: VerUsuariosProductoComponent;
  let fixture: ComponentFixture<VerUsuariosProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUsuariosProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsuariosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
