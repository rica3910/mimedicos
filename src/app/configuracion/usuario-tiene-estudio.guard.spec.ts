import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioTieneEstudioGuard } from './usuario-tiene-estudio.guard';

describe('UsuarioTieneEstudioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioTieneEstudioGuard]
    });
  });

  it('should ...', inject([UsuarioTieneEstudioGuard], (guard: UsuarioTieneEstudioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
