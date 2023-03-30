import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

import { CALLER_ID_EXPIRES_SECONDS, CALLER_ID_TABLE } from '../../consts';
import { User } from '../../types';

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

type Props = {
  user: User;
  callerId: string;
};

export async function putCallerId({ user, callerId }: Props) {
  const expiresTimestampSeconds =
    Math.floor(Date.now() / 1000) + CALLER_ID_EXPIRES_SECONDS;

  const command = new PutCommand({
    TableName: CALLER_ID_TABLE,
    Item: {
      username: user.email,
      callerId,
      expires: expiresTimestampSeconds,
    },
  });

  await ddbDocClient.send(command);

  return { expiresTimestampSeconds };
}
