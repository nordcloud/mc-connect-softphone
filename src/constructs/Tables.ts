import { ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { getStageConsts } from '../utils/getStageConsts';

const { OUTBAND_CALLING_TABLE_ARN } = getStageConsts();

export class Tables extends Construct {
  public readonly callingTable: ITable;

  constructor(scope: Construct) {
    super(scope, 'Tables');

    this.callingTable = Table.fromTableArn(
      this,
      'OutboundCallingTable',
      OUTBAND_CALLING_TABLE_ARN
    );
  }
}
