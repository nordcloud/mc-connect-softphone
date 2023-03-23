/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fetch, { Response } from 'node-fetch';

import { IdTokenPayload } from '../../../types';
import { getCookie } from '../../../utils/getCookie';
import { getIdTokenPayload } from '../../../utils/getIdTokenPayload';
import { assertLoginFlowCookie } from '../assertLoginFlowCookie';
import { checkOAuthUrlParams } from '../checkOAuthUrlParams';
import { fetchIdToken } from '../fetchIdToken';

jest.mock('node-fetch');
jest.mock('../../../utils/getCookie');
jest.mock('../../../utils/getIdTokenPayload');
jest.mock('../assertLoginFlowCookie');
jest.mock('../checkOAuthUrlParams');

jest.mocked(getCookie).mockReturnValue(
  JSON.stringify({
    stateNonce: 'dummyStateNonce',
    idTokenNonce: 'dummyIdTokenNonce',
    codeVerifier: 'dummyCodeVerifier',
  })
);

jest.mocked(fetch).mockResolvedValue({
  json: () => Promise.resolve({ id_token: 'dummyIdToken' }),
} as Response);

const args = [
  {
    queryStringParameters: {
      state: 'dummyStateNonce',
      code: 'dummyCode',
    },
  },
] as unknown as Parameters<typeof fetchIdToken>;

beforeEach(() => {
  process.env.LOGIN_CALLABCK_URL = 'dummyLoginCallbackUrl';
});

describe('fetchIdToken', () => {
  it('calls getCookie with correct args', async () => {
    await fetchIdToken(...args);
    expect(jest.mocked(getCookie).mock.calls).toMatchSnapshot();
  });

  it('calls assertLoginFlowCookie with correct args', async () => {
    await fetchIdToken(...args);
    expect(jest.mocked(assertLoginFlowCookie).mock.calls).toMatchSnapshot();
  });

  it('calls getIdTokenPayload with correct args', async () => {
    await fetchIdToken(...args);
    expect(jest.mocked(getIdTokenPayload).mock.calls).toMatchSnapshot();
  });

  it('calls fetch with correct args', async () => {
    await fetchIdToken(...args);
    expect(jest.mocked(fetch).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(fetchIdToken(...args)).resolves.toMatchSnapshot();
  });

  describe('when LOGIN_CALLABCK_URL is missing', () => {
    beforeEach(() => {
      delete process.env.LOGIN_CALLABCK_URL;
    });

    it('rejects with a correct value', () => {
      return expect(fetchIdToken(...args)).rejects.toMatchSnapshot();
    });
  });

  describe('when checkOAuthUrlParams returnes false', () => {
    beforeEach(() => {
      jest.mocked(checkOAuthUrlParams).mockReturnValueOnce(false);
    });

    it('resolves with a correct value', () => {
      return expect(fetchIdToken(...args)).resolves.toMatchSnapshot();
    });
  });

  describe('when getCookie returnes undefined', () => {
    beforeEach(() => {
      jest.mocked(getCookie).mockReturnValueOnce(undefined);
    });

    it('resolves with a correct value', () => {
      return expect(fetchIdToken(...args)).resolves.toMatchSnapshot();
    });
  });

  describe('when "state" url params do not match with stateNonce from loginFlow cookie', () => {
    const argsClone = structuredClone(args);
    argsClone[0].queryStringParameters!.state = 'hackedState';

    it('resolves with a correct value', () => {
      return expect(fetchIdToken(...argsClone)).resolves.toMatchSnapshot();
    });
  });

  describe('when "fetch" response has "error" prop', () => {
    beforeEach(() => {
      jest.mocked(fetch).mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            error: 'dummyError',
            error_description: 'dummyErrorDescription',
          }),
      } as Response);
    });

    it('rejects with a correct value', () => {
      return expect(fetchIdToken(...args)).rejects.toMatchSnapshot();
    });
  });

  describe('when "nonce" from getIdTokenPayload do not match with nonce from loginFlow cookie', () => {
    beforeEach(() => {
      jest
        .mocked(getIdTokenPayload)
        .mockReturnValueOnce({ nonce: 'hackedNonce' } as IdTokenPayload);
    });

    it('resolves with a correct value', () => {
      return expect(fetchIdToken(...args)).resolves.toMatchSnapshot();
    });
  });
});
