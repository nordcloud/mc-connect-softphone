import { assertStageName } from '../assertStageName';

describe('assertStageName', () => {
  it("doesn't throw", () => {
    expect(() => {
      assertStageName('prod');
    }).not.toThrow();
  });

  it('throws when stage is undefined', () => {
    expect(() => {
      assertStageName();
    }).toThrow();
  });

  it('throws when stage is unexisting', () => {
    expect(() => {
      assertStageName('unexisting stage name');
    }).toThrow();
  });
});
