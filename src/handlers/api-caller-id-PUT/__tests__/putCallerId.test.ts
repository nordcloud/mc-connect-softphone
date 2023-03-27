import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

import { putCallerId } from '../putCallerId';

const ddbMock = mockClient(DynamoDBDocumentClient);

const args = [
  {
    user: { email: 'dummyUserEmail' },
    callerId: 'dummyCallerId',
  },
] as unknown as Parameters<typeof putCallerId>;

beforeEach(() => {
  ddbMock.reset();
  ddbMock.on(PutCommand).resolves({});
});

describe('putCallerId', () => {
  it('sends "PutCommand" with correct args', async () => {
    await putCallerId(...args);
    expect(ddbMock.commandCalls(PutCommand)[0].args[0].input).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(putCallerId(...args)).resolves.toMatchSnapshot();
  });
});
