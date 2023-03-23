import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

import { scanDynamoDB } from '../scanDynamoDB';

const ddbMock = mockClient(DynamoDBDocumentClient);

const arg = {
  tableName: 'dummyTableName',
  onlyAttributes: ['dummyAttribute'],
};

beforeEach(() => {
  ddbMock.reset();
  ddbMock.on(ScanCommand).resolves({ Items: [{ dummyItemKey: 'dummyItemValue' }] });
});

describe('ddbScan', () => {
  it('sends "ScanCommand" with correct args', async () => {
    await scanDynamoDB(arg);
    expect(ddbMock.commandCalls(ScanCommand)[0].args[0].input).toMatchSnapshot();
  });

  it('resolves with a correct value', () => {
    return expect(scanDynamoDB(arg)).resolves.toMatchSnapshot();
  });

  describe('when "LastEvaluatedKey" exists in "ScanCommand" output', () => {
    beforeEach(() => {
      ddbMock
        .on(ScanCommand)
        .resolvesOnce({
          Items: [{ dummyItemKey1: 'dummyItemValue1' }],
          LastEvaluatedKey: { lastKeyProp: 'lastKeyValue' },
        })
        .resolvesOnce({
          Items: [{ dummyItemKey2: 'dummyItemValue2' }],
        });
    });

    it('sends "ScanCommand" a second time with correct args', async () => {
      await scanDynamoDB(arg);
      expect(ddbMock.commandCalls(ScanCommand)[1].args[0].input).toMatchSnapshot();
    });

    it('resolves with a correct value', () => {
      return expect(scanDynamoDB(arg)).resolves.toMatchSnapshot();
    });
  });
});
