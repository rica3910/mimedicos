import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeVerHistorialCobroGuard } from './usuario-puede-ver-historial-cobro.guard';

describe('UsuarioPuedeVerHistorialCobroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeVerHistorialCobroGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeVerHistorialCobroGuard], (guard: UsuarioPuedeVerHistorialCobroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
