import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { getCookie } from '../getCookie';
import { getStage } from '../getStage';
import { getUser } from '../getUser';
import { validateIdToken } from '../validateIdToken';

jest.mock('../getCookie');
jest.mock('../getStage');
jest.mock('../validateIdToken');

const event = {} as APIGatewayProxyEventV2;

describe('getuser', () => {
  it('calls getCookie with correct args', async () => {
    await getUser(event);
    expect(jest.mocked(getCookie).mock.calls).toMatchSnapshot();
  });

  it('calls validateIdToken with correct args', async () => {
    await getUser(event);
    expect(jest.mocked(validateIdToken).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    expect(getUser(event)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when ID token is missing', () => {
    jest.mocked(getCookie).mockReturnValueOnce(undefined);
    expect(getUser(event)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when ID token is invalid', () => {
    jest.mocked(validateIdToken).mockResolvedValueOnce({ active: false });
    expect(getUser(event)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when running in "local" stage', () => {
    jest.mocked(getStage).mockReturnValueOnce('local');
    expect(getUser(event)).resolves.toMatchSnapshot();
  });
});
