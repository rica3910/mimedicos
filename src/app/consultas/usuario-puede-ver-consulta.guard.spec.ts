import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeVerConsultaGuard } from './usuario-puede-ver-consulta.guard';

describe('UsuarioPuedeVerConsultaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeVerConsultaGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeVerConsultaGuard], (guard: UsuarioPuedeVerConsultaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
