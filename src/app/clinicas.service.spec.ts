import { TestBed, inject } from '@angular/core/testing';

import { ClinicasService } from './clinicas.service';

describe('ClinicasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicasService]
    });
  });

  it('should be created', inject([ClinicasService], (service: ClinicasService) => {
    expect(service).toBeTruthy();
  }));
});
