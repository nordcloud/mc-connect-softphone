import cookie from 'cookie';

import { loginRedirect } from '../loginRedirect';
import { randomBase64 } from '../randomBase64';

jest.mock('../randomBase64');

beforeEach(() => {
  process.env.LOGIN_CALLABCK_URL = 'dummyLoginCallbackUrl';
});

describe('loginRedirect', () => {
  it('calls randomBase64 with correct args', async () => {
    await loginRedirect();
    expect(jest.mocked(randomBase64).mock.calls).toMatchSnapshot();
  });

  // it('calls crypto.createHash with correct args', async () => {
  //   await loginRedirect();
  //   expect(jest.mocked(crypto.createHash).mock.calls).toMatchSnapshot();
  // });

  // it('calls crypto.createHash().update with correct args', async () => {
  //   await loginRedirect();
  //   expect(jest.mocked(crypto.createHash('').update).mock.calls).toMatchSnapshot();
  // });

  // it('calls crypto.createHash().update().digest with correct args', async () => {
  //   await loginRedirect();
  //   expect(
  //     jest.mocked(crypto.createHash('').update('').digest).mock.calls
  //   ).toMatchSnapshot();
  // });

  it('calls cookie.serialize with correct args', async () => {
    await loginRedirect();
    expect(jest.mocked(cookie.serialize).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    expect(loginRedirect()).resolves.toMatchSnapshot();
  });

  it('rejects with a correct value when LOGIN_CALLABCK_URL is missing', () => {
    delete process.env.LOGIN_CALLABCK_URL;
    expect(loginRedirect()).rejects.toMatchSnapshot();
  });
});
