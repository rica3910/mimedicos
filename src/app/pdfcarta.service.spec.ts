import { TestBed } from '@angular/core/testing';

import { PDFCartaService } from './pdfcarta.service';

describe('PDFCartaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PDFCartaService = TestBed.get(PDFCartaService);
    expect(service).toBeTruthy();
  });
});
