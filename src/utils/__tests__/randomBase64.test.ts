import crypto from 'crypto';

import { randomBase64 } from '../randomBase64';

jest.mock('util');
jest.mock('crypto');

const arg = 64;

describe('randomBase64', () => {
  it('calls crypto.randomBytes with correct args', async () => {
    await randomBase64(arg);
    expect(jest.mocked(crypto.randomBytes).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    expect(randomBase64(arg)).resolves.toMatchSnapshot();
  });
});
