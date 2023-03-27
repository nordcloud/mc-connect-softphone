import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';

import { Api } from './Api';
import { Assets } from './Assets';
import { CallerID } from './CallerID';

export class RootStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);

    const { customersTable, callerIdTable } = new CallerID(this);
    const { assetsUrl } = new Assets(this);
    const { apiUrl } = new Api(this, { assetsUrl, customersTable, callerIdTable });

    new CfnOutput(this, 'ApiUrl', {
      value: apiUrl,
    });
  }
}
