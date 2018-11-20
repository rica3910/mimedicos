import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeEditarDiagnosticosGuard } from './usuario-puede-editar-diagnosticos.guard';

describe('UsuarioPuedeEditarDiagnosticosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeEditarDiagnosticosGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeEditarDiagnosticosGuard], (guard: UsuarioPuedeEditarDiagnosticosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
