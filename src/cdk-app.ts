import { App } from 'aws-cdk-lib';

import { RootStack } from './constructs/RootStack';
import { APP_NAME, AWS_ACCOUNT, AWS_REGION } from './consts';

const app = new App();

new RootStack(app, APP_NAME, {
  env: {
    account: AWS_ACCOUNT,
    region: AWS_REGION,
  },
});
