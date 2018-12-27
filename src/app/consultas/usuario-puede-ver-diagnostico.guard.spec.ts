import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeVerDiagnosticoGuard } from './usuario-puede-ver-diagnostico.guard';

describe('UsuarioPuedeVerDiagnosticoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeVerDiagnosticoGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeVerDiagnosticoGuard], (guard: UsuarioPuedeVerDiagnosticoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
