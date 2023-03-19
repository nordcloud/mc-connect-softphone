import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

type Props<Item> = {
  tableName: string;
  onlyAttributes?: (keyof Item)[];
};

export async function scanDynamoDB<Item>({ tableName, onlyAttributes }: Props<Item>) {
  let results: Item[] = [];

  const scan = async (ExclusiveStartKey?: Record<string, unknown>) => {
    const input: ScanCommandInput = {
      TableName: tableName,
      ExclusiveStartKey,
    };

    if (onlyAttributes) {
      input.ProjectionExpression = onlyAttributes.join(',');
    }

    const command = new ScanCommand(input);
    const { Items, LastEvaluatedKey } = await ddbDocClient.send(command);

    if (Items) {
      results = results.concat(Items as Item[]);
    }

    if (LastEvaluatedKey) {
      await scan(LastEvaluatedKey);
    }
  };

  await scan();

  return results;
}
