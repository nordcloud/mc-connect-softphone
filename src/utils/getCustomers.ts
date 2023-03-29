import { CUSTOMERS_TABLE_ARN } from '../consts';
import { customersMock } from '../mockData';
import { CustomersTableItem } from '../types';
import { getStage } from './getStage';
import { scanDynamoDB } from './scanDynamoDB';

export async function getCustomers() {
  if (getStage() === 'local') {
    return customersMock;
  }

  const tableName = CUSTOMERS_TABLE_ARN.split('/').at(-1) as string;
  const items = await scanDynamoDB<CustomersTableItem>({ tableName });
  const sortedItems = items.sort((a, b) => a.CustomerName.localeCompare(b.CustomerName));

  return sortedItems;
}
