import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeEditarRecetaGuard } from './usuario-puede-editar-receta.guard';

describe('UsuarioPuedeEditarRecetaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeEditarRecetaGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeEditarRecetaGuard], (guard: UsuarioPuedeEditarRecetaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
