import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRecetaComponent } from './editar-receta.component';

describe('EditarRecetaComponent', () => {
  let component: EditarRecetaComponent;
  let fixture: ComponentFixture<EditarRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
