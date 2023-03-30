import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { CALLER_ID_TABLE, CUSTOMERS_TABLE_ARN } from '../consts';
import { createLambda } from '../utils/constructsHelpers/createLambda';

export class CallerID extends Construct {
  public readonly callerIdTable: Table;

  public readonly customersTable: ITable;

  constructor(scope: Construct) {
    super(scope, 'CallerID');

    const callerIdTable = new Table(this, 'CallerIdTable', {
      tableName: CALLER_ID_TABLE,
      partitionKey: {
        name: 'username',
        type: AttributeType.STRING,
      },
      timeToLiveAttribute: 'expires',
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const outboundFlowFn = createLambda(this, 'connect-outbound-flow');

    callerIdTable.grantReadData(outboundFlowFn);

    const customersTable = Table.fromTableArn(
      this,
      'CustomersCallingTable',
      CUSTOMERS_TABLE_ARN
    );

    this.customersTable = customersTable;
    this.callerIdTable = callerIdTable;
  }
}
