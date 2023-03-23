import { trimTrailingSlash } from '../trimTrailingSlash';

describe('trimTrailingSlash', () => {
  it('returns a correct value', () => {
    expect(trimTrailingSlash('http://foo.bar/')).toMatch('http://foo.bar');
  });
});
