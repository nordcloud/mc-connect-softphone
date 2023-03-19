import type { StageConsts } from './types';

export const AWS_ACCOUNT = '552821478383';
export const AWS_REGION = 'eu-central-1';

export const APP_NAME = `mc-connect-softphone-${process.env.STAGE}`;

export const ID_TOKEN_COOKIE = 'idToken';
export const LOGIN_FLOW_COOKIE = 'loginFlowState';

const prod = {
  OAUTH_BASE_URL: 'https://nordcloud.okta.com/oauth2/v1',
  OAUTH_CLIENT_ID: '',
  OUTBAND_CALLING_TABLE_ARN:
    'arn:aws:dynamodb:eu-central-1:552821478383:table/Connect-Outbound-Calling-Table',
};

const dev = {
  OAUTH_BASE_URL: 'https://dev-nordcloud.okta.com/oauth2/v1',
  OAUTH_CLIENT_ID: '0oa8r5pc7cz42WPxW5d7',
  OUTBAND_CALLING_TABLE_ARN:
    'arn:aws:dynamodb:eu-central-1:552821478383:table/Connect-Outbound-Calling-Table',
};

export const stageConsts = {
  prod,
  dev,
  local: dev,
} satisfies StageConsts;
