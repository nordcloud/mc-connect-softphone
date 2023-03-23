import cookie from 'cookie';

import { getCookie } from '../../../utils/getCookie';
import { handler } from '../handler';

jest.mock('../../../utils/getCookie');

const args = ['dummyEvent'] as unknown as Parameters<typeof handler>;

beforeEach(() => {
  process.env.API_URL = 'dummyApiUrl';
});

describe('logout handler', () => {
  it('calls getCookie with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(getCookie).mock.calls).toMatchSnapshot();
  });

  it('calls cookie.serialize with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(cookie.serialize).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  describe('when API_URL is missing', () => {
    beforeEach(() => {
      delete process.env.API_URL;
    });

    it('rejects with a correct value', () => {
      return expect(handler(...args)).rejects.toMatchSnapshot();
    });
  });

  describe('when ID token cookie is missing', () => {
    beforeEach(() => {
      jest.mocked(getCookie).mockReturnValueOnce(undefined);
    });

    it('calls cookie.serialize with correct args', async () => {
      await handler(...args);
      expect(jest.mocked(cookie.serialize).mock.calls).toMatchSnapshot();
    });
  });
});
