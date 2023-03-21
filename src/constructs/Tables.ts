import { ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { CUSTOMERS_TABLE_ARN } from '../consts';

export class Tables extends Construct {
  public readonly customersTable: ITable;

  constructor(scope: Construct) {
    super(scope, 'Tables');

    this.customersTable = Table.fromTableArn(
      this,
      'CustomersCallingTable',
      CUSTOMERS_TABLE_ARN
    );
  }
}
