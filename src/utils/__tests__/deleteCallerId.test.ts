import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

import { deleteCallerId } from '../deleteCallerId';

const ddbMock = mockClient(DynamoDBDocumentClient);

const args = ['username'] as const;

beforeEach(() => {
  ddbMock.reset();
  ddbMock.on(DeleteCommand).resolves({ Attributes: { callerId: 'dummyCallerId' } });
});

describe('deleteCallerId', () => {
  it('sends "DeleteCommand" with correct args', async () => {
    await deleteCallerId(...args);
    expect(ddbMock.commandCalls(DeleteCommand)[0].args[0].input).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(deleteCallerId(...args)).resolves.toMatchSnapshot();
  });

  it('resolves with a correct value when output from DeleteCommand is empty', () => {
    ddbMock.on(DeleteCommand).resolvesOnce({});
    return expect(deleteCallerId(...args)).resolves.toMatchSnapshot();
  });
});
