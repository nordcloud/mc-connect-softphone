import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { CUSTOMERS_TABLE_ARN } from '../../consts';
import { customersMock } from '../../mockData';
import { CustomersTableItem } from '../../types';
import { getStage } from '../../utils/getStage';
import { scanDynamoDB } from '../../utils/scanDynamoDB';

export async function getCustomers(event: APIGatewayProxyEventV2) {
  const isMockMode =
    getStage() === 'local' &&
    Object.keys(Object(event.queryStringParameters)).includes('mock_db');

  if (isMockMode) {
    return customersMock;
  }

  const tableName = CUSTOMERS_TABLE_ARN.split('/').at(-1);

  if (!tableName) {
    throw new Error('Missing customers table name');
  }

  const items = await scanDynamoDB<CustomersTableItem>({ tableName });
  const sortedItems = items.sort((a, b) => a.CustomerName.localeCompare(b.CustomerName));

  return sortedItems;
}
