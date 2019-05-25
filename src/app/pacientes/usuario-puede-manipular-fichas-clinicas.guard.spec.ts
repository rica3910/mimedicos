import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeManipularFichasClinicasGuard } from './usuario-puede-manipular-fichas-clinicas.guard';

describe('UsuarioPuedeManipularFichasClinicasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeManipularFichasClinicasGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeManipularFichasClinicasGuard], (guard: UsuarioPuedeManipularFichasClinicasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
