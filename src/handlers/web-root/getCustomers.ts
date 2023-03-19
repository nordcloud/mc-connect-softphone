import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { customersMock } from '../../mockData';
import { CustomersTableItem } from '../../types';
import { getStage } from '../../utils/getStage';
import { getStageConsts } from '../../utils/getStageConsts';
import { scanDynamoDB } from '../../utils/scanDynamoDB';

const { OUTBAND_CALLING_TABLE_ARN } = getStageConsts();

export async function getCustomers(event: APIGatewayProxyEventV2) {
  const isMockMode =
    getStage() === 'local' &&
    Object.keys(Object(event.queryStringParameters)).includes('mock_customers');

  if (isMockMode) {
    return customersMock;
  }

  const tableName = OUTBAND_CALLING_TABLE_ARN.split('/').at(-1);

  if (!tableName) {
    throw new Error('Missing OutboundCallingTable name');
  }

  const items = await scanDynamoDB<CustomersTableItem>({ tableName });
  const sortedItems = items.sort((a, b) => a.CustomerName.localeCompare(b.CustomerName));

  return sortedItems;
}
