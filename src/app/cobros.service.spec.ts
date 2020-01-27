import { TestBed } from '@angular/core/testing';

import { CobrosService } from './cobros.service';

describe('CobrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CobrosService = TestBed.get(CobrosService);
    expect(service).toBeTruthy();
  });
});
