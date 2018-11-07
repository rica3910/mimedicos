import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeVerDiagnosticosGuard } from './usuario-puede-ver-diagnosticos.guard';

describe('UsuarioPuedeVerDiagnosticosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeVerDiagnosticosGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeVerDiagnosticosGuard], (guard: UsuarioPuedeVerDiagnosticosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
