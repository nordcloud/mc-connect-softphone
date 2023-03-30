import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

import { getCallerId } from '../getCallerId';
import { getStage } from '../getStage';

jest.mock('../getStage');

const ddbMock = mockClient(DynamoDBDocumentClient);

const args = ['username'] as const;

beforeEach(() => {
  ddbMock.reset();
  ddbMock.on(GetCommand).resolves({ Item: { callerId: 'dummyCallerId' } });
});

describe('getCallerId', () => {
  it('sends "GetCommand" with correct args', async () => {
    await getCallerId(...args);
    expect(ddbMock.commandCalls(GetCommand)[0].args[0].input).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(getCallerId(...args)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when output from GetCommand is empty', () => {
    ddbMock.on(GetCommand).resolvesOnce({});
    return expect(getCallerId(...args)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when running in "local" stage', () => {
    jest.mocked(getStage).mockReturnValueOnce('local');
    expect(getCallerId(...args)).resolves.toMatchSnapshot();
  });
});
