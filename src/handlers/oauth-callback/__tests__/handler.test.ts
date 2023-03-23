import cookie from 'cookie';

import { getStage } from '../../../utils/getStage';
import { fetchIdToken } from '../fetchIdToken';
import { handler } from '../handler';

jest.mock('../fetchIdToken');
jest.mock('../../../utils/getStage');

const args = ['dummyEvent'] as unknown as Parameters<typeof handler>;

describe('oauth-callback handler', () => {
  it('calls fetchIdToken with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(fetchIdToken).mock.calls).toMatchSnapshot();
  });

  it('calls cookie.serialize with correct args', async () => {
    await handler(...args);
    expect(jest.mocked(cookie.serialize).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(handler(...args)).resolves.toMatchSnapshot();
  });

  describe('when stage is "local"', () => {
    beforeEach(() => {
      jest.mocked(getStage).mockReturnValue('local');
    });

    it('calls cookie.serialize with correct args', async () => {
      await handler(...args);
      expect(jest.mocked(cookie.serialize).mock.calls).toMatchSnapshot();
    });
  });

  describe('when idTokenData is missing', () => {
    beforeEach(() => {
      jest.mocked(fetchIdToken).mockResolvedValueOnce(undefined);
    });

    it('resolves with a correct value', () => {
      return expect(handler(...args)).resolves.toMatchSnapshot();
    });
  });
});
