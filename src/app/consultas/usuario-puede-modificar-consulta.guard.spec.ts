import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeModificarConsultaGuard } from './usuario-puede-modificar-consulta.guard';

describe('UsuarioPuedeModificarConsultaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeModificarConsultaGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeModificarConsultaGuard], (guard: UsuarioPuedeModificarConsultaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
