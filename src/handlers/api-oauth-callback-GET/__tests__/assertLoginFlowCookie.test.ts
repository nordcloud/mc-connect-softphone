import { assertLoginFlowCookie } from '../assertLoginFlowCookie';

const arg = {
  stateNonce: 'dummyStateNonce',
  idTokenNonce: 'dummyIdTokenNonce',
  codeVerifier: 'dummyCodeVerifier',
};

describe('assertLoginFlowCookie', () => {
  it("doesn't throw", () => {
    expect(() => {
      assertLoginFlowCookie(arg);
    }).not.toThrow();
  });

  it('throws when arg is not an object', () => {
    expect(() => {
      assertLoginFlowCookie('nonObjectValue');
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws when "stateNonce" is falsy', () => {
    expect(() => {
      assertLoginFlowCookie({ ...arg, stateNonce: '' });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws when "idTokenNonce" is falsy', () => {
    expect(() => {
      assertLoginFlowCookie({ ...arg, idTokenNonce: '' });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws when "codeVerifier" is falsy', () => {
    expect(() => {
      assertLoginFlowCookie({ ...arg, codeVerifier: '' });
    }).toThrowErrorMatchingSnapshot();
  });
});
