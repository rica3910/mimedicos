import { TestBed } from '@angular/core/testing';

import { RecetaPDFService } from './receta-pdf.service';

describe('RecetaPDFService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecetaPDFService = TestBed.get(RecetaPDFService);
    expect(service).toBeTruthy();
  });
});
