import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioTienePacienteGuard } from './usuario-tiene-paciente.guard';

describe('UsuarioTienePacienteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioTienePacienteGuard]
    });
  });

  it('should ...', inject([UsuarioTienePacienteGuard], (guard: UsuarioTienePacienteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
