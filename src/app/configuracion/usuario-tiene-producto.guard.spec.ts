import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioTieneProductoGuard } from './usuario-tiene-producto.guard';

describe('UsuarioTieneProductoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioTieneProductoGuard]
    });
  });

  it('should ...', inject([UsuarioTieneProductoGuard], (guard: UsuarioTieneProductoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
