import { TestBed, inject } from '@angular/core/testing';

import { EsperarService } from './esperar.service';

describe('EsperarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsperarService]
    });
  });

  it('should be created', inject([EsperarService], (service: EsperarService) => {
    expect(service).toBeTruthy();
  }));
});
