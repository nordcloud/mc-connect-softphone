import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { getCustomers } from '../getCustomers';
import { getStage } from '../getStage';
import { scanDynamoDB } from '../scanDynamoDB';

jest.mock('../getStage');

jest.mock('../scanDynamoDB', () => ({
  scanDynamoDB: jest
    .fn()
    .mockResolvedValue([{ CustomerName: 'xyz' }, { CustomerName: 'abc' }]),
}));

const event = {} as APIGatewayProxyEventV2;

describe('getCustomers', () => {
  it('calls scanDynamoDB with correct args', async () => {
    await getCustomers(event);
    expect(jest.mocked(scanDynamoDB).mock.calls).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    expect(getCustomers(event)).resolves.toMatchSnapshot();
  });

  describe('when running in mock mode', () => {
    const eventClone = {
      queryStringParameters: { mock_db: '' },
    } as unknown as APIGatewayProxyEventV2;

    it('resolves with a correct value in "prod" stage', () => {
      expect(getCustomers(eventClone)).resolves.toMatchSnapshot();
    });

    it('resolves with a correct value in "local" stage', () => {
      jest.mocked(getStage).mockReturnValueOnce('local');
      expect(getCustomers(eventClone)).resolves.toMatchSnapshot();
    });
  });
});
