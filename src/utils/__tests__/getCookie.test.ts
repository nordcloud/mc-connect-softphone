import cookie from 'cookie';

import { getCookie } from '../getCookie';

jest.mock('cookie', () => ({
  parse: jest.fn().mockReturnValue({
    dummyCookieName: 'dummyCookieValue',
  }),
}));

const args = [{ cookies: ['dummyCookie'] }, 'dummyCookieName'] as Parameters<
  typeof getCookie
>;

describe('getCookie', () => {
  it('calls cookie.parse with correct args', () => {
    getCookie(...args);
    expect(jest.mocked(cookie.parse).mock.calls).toMatchSnapshot();
  });

  it('returns a correct value', () => {
    expect(getCookie(...args)).toMatchSnapshot();
  });

  it('returns a correct value when event.cookies is missing', () => {
    const argsClone = structuredClone(args);
    delete argsClone[0].cookies;
    expect(getCookie(...argsClone)).toMatchSnapshot();
  });
});
