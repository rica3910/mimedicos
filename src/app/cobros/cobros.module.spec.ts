import { CobrosModule } from './cobros.module';

describe('CobrosModule', () => {
  let cobrosModule: CobrosModule;

  beforeEach(() => {
    cobrosModule = new CobrosModule();
  });

  it('should create an instance', () => {
    expect(cobrosModule).toBeTruthy();
  });
});
