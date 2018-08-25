import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeModificarCitaGuard } from './usuario-puede-modificar-cita.guard';

describe('UsuarioPuedeModificarCitaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeModificarCitaGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeModificarCitaGuard], (guard: UsuarioPuedeModificarCitaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
