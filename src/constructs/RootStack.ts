import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';

import { Api } from './Api';
import { Assets } from './Assets';
import { Tables } from './Tables';

export class RootStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);

    const { callingTable } = new Tables(this);
    const { assetsUrl } = new Assets(this);
    const { apiUrl } = new Api(this, { assetsUrl, callingTable });

    new CfnOutput(this, 'ApiUrl', {
      value: apiUrl,
    });
  }
}
