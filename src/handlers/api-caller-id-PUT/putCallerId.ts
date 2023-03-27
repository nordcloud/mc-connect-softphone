import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

import { CALLER_ID_TABLE } from '../../consts';
import { User } from '../../types';

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

type Props = {
  user: User;
  callerId: string;
};

export function putCallerId({ user, callerId }: Props) {
  const command = new PutCommand({
    TableName: CALLER_ID_TABLE,
    Item: {
      username: user.email,
      callerId,
    },
  });

  return ddbDocClient.send(command);
}
