import { TestBed, inject } from '@angular/core/testing';

import { AutenticarService } from './autenticar.service';

describe('AutenticarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticarService]
    });
  });

  it('should be created', inject([AutenticarService], (service: AutenticarService) => {
    expect(service).toBeTruthy();
  }));
});
