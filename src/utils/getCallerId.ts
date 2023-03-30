import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

import { CALLER_ID_TABLE } from '../consts';
import { getStage } from './getStage';

const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export async function getCallerId(username: string) {
  if (getStage() === 'local') {
    return 'mockedCallerId';
  }

  const getCommand = new GetCommand({
    TableName: CALLER_ID_TABLE,
    Key: { username },
  });

  const { Item } = await ddbDocClient.send(getCommand);

  return Item?.callerId;
}
