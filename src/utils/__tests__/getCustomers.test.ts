import { getCustomers } from '../getCustomers';
import { getStage } from '../getStage';
import { scanDynamoDB } from '../scanDynamoDB';

jest.mock('../getStage');

jest.mock('../scanDynamoDB', () => ({
  scanDynamoDB: jest
    .fn()
    .mockResolvedValue([{ CustomerName: 'xyz' }, { CustomerName: 'abc' }]),
}));

describe('getCustomers', () => {
  it('calls scanDynamoDB with correct args', async () => {
    await getCustomers();
    expect(jest.mocked(scanDynamoDB).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    expect(getCustomers()).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when running in "local" stage', () => {
    jest.mocked(getStage).mockReturnValueOnce('local');
    expect(getCustomers()).resolves.toMatchSnapshot();
  });
});
