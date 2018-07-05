import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioTieneMenuGuard } from './usuario-tiene-menu.guard';

describe('UsuarioTieneMenuGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioTieneMenuGuard]
    });
  });

  it('should ...', inject([UsuarioTieneMenuGuard], (guard: UsuarioTieneMenuGuard) => {
    expect(guard).toBeTruthy();
  }));
});
