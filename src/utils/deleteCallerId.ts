import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

import { CALLER_ID_TABLE } from '../consts';
import { getStage } from './getStage';

const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export async function deleteCallerId(username: string) {
  if (getStage() === 'local') {
    return 'mockedCallerId';
  }

  const deleteCommand = new DeleteCommand({
    TableName: CALLER_ID_TABLE,
    Key: { username },
    ReturnValues: 'ALL_OLD',
  });

  const { Attributes } = await ddbDocClient.send(deleteCommand);

  return Attributes?.callerId;
}
