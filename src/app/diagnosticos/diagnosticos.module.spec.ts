import { DiagnosticosModule } from './diagnosticos.module';

describe('DiagnosticosModule', () => {
  let diagnosticosModule: DiagnosticosModule;

  beforeEach(() => {
    diagnosticosModule = new DiagnosticosModule();
  });

  it('should create an instance', () => {
    expect(diagnosticosModule).toBeTruthy();
  });
});
