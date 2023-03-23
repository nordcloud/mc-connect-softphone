import fetch, { Response } from 'node-fetch';

import { validateIdToken } from '../validateIdToken';

jest.mock('node-fetch');

jest.mocked(fetch).mockResolvedValue({
  json: () => Promise.resolve({}),
} as Response);

const token = 'dummyIdToken';

describe('validateIdToken', () => {
  it('calls fetch with correct args', async () => {
    await validateIdToken(token);
    expect(jest.mocked(fetch).mock.calls).toMatchSnapshot();
  });

  it('rejects with a correct value when "fetch" response has "error" prop', () => {
    jest.mocked(fetch).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: 'dummyError',
          error_description: 'dummyErrorDescription',
        }),
    } as Response);
    return expect(validateIdToken(token)).rejects.toMatchSnapshot();
  });
});
