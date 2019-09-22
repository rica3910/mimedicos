import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecetasComponent } from './lista-recetas.component';

describe('ListaRecetasComponent', () => {
  let component: ListaRecetasComponent;
  let fixture: ComponentFixture<ListaRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
