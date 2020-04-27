import { ConfiguracionModule } from './configuracion.module';

describe('ConfiguracionModule', () => {
  let configuracionModule: ConfiguracionModule;

  beforeEach(() => {
    configuracionModule = new ConfiguracionModule();
  });

  it('should create an instance', () => {
    expect(configuracionModule).toBeTruthy();
  });
});
