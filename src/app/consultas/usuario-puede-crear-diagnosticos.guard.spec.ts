import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeCrearDiagnosticosGuard } from './usuario-puede-crear-diagnosticos.guard';

describe('UsuarioPuedeCrearDiagnosticosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeCrearDiagnosticosGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeCrearDiagnosticosGuard], (guard: UsuarioPuedeCrearDiagnosticosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
