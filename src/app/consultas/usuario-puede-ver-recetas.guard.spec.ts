import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioPuedeVerRecetasGuard } from './usuario-puede-ver-recetas.guard';

describe('UsuarioPuedeVerRecetasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioPuedeVerRecetasGuard]
    });
  });

  it('should ...', inject([UsuarioPuedeVerRecetasGuard], (guard: UsuarioPuedeVerRecetasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
