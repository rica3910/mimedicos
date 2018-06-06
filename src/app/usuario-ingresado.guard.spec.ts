import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioIngresadoGuard } from './usuario-ingresado.guard';

describe('UsuarioIngresadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioIngresadoGuard]
    });
  });

  it('should ...', inject([UsuarioIngresadoGuard], (guard: UsuarioIngresadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
