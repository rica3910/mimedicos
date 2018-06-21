import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPasswordOlvidadoComponent } from './cambiar-password-olvidado.component';

describe('CambiarPasswordOlvidadoComponent', () => {
  let component: CambiarPasswordOlvidadoComponent;
  let fixture: ComponentFixture<CambiarPasswordOlvidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarPasswordOlvidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarPasswordOlvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
