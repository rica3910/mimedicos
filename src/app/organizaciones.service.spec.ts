import { TestBed, inject } from '@angular/core/testing';

import { OrganizacionesService } from './organizaciones.service';

describe('OrganizacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizacionesService]
    });
  });

  it('should be created', inject([OrganizacionesService], (service: OrganizacionesService) => {
    expect(service).toBeTruthy();
  }));
});
