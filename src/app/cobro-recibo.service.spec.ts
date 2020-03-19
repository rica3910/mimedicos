import { TestBed } from '@angular/core/testing';

import { CobroReciboService } from './cobro-recibo.service';

describe('CobroReciboService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CobroReciboService = TestBed.get(CobroReciboService);
    expect(service).toBeTruthy();
  });
});
