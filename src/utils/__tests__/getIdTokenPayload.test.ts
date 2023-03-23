import { getIdTokenPayload } from '../getIdTokenPayload';

const idToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('getIdTokenPayload', () => {
  it('returns a correct value', () => {
    expect(getIdTokenPayload(idToken)).toMatchSnapshot();
  });
});
