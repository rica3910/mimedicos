import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInvalidaComponent } from './pagina-invalida.component';

describe('PaginaInvalidaComponent', () => {
  let component: PaginaInvalidaComponent;
  let fixture: ComponentFixture<PaginaInvalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaInvalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaInvalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
