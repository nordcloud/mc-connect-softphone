import { checkOAuthUrlParams } from '../checkOAuthUrlParams';

const params = {
  code: 'dummyCode',
  state: 'dummyState',
};

describe('checkOAuthUrlParams', () => {
  it('returns "true"', () => {
    expect(checkOAuthUrlParams(params)).toBe(true);
  });

  it('returns "false" when call arg is falsy', () => {
    expect(checkOAuthUrlParams(undefined)).toBe(false);
  });

  it('returns "false" when "error prop is present"', () => {
    expect(checkOAuthUrlParams({ ...params, error: 'dummyError' })).toBe(false);
  });

  it('returns "false" when "code" prop is missing', () => {
    expect(checkOAuthUrlParams({ ...params, code: undefined })).toBe(false);
  });

  it('returns "false" when "state" prop is missing', () => {
    expect(checkOAuthUrlParams({ ...params, state: undefined })).toBe(false);
  });
});
