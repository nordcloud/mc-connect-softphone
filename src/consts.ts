import path from 'path';

import type { StageConsts } from './types';

export const AWS_ACCOUNT = '552821478383';
export const AWS_REGION = 'eu-central-1';
export const APP_NAME = `mc-connect-softphone-${process.env.STAGE}`;

export const ID_TOKEN_COOKIE = 'idToken';
export const LOGIN_FLOW_COOKIE = 'loginFlowState';
export const CALLER_ID_TABLE = `${APP_NAME}-agents-caller-id`;
export const CALLER_ID_EXPIRES_SECONDS = 5 * 60;

export const AWS_CONNECT_URL =
  'https://nordcloud-connect.my.connect.aws/ccp-v2/softphone';

export const CUSTOMERS_TABLE_ARN =
  'arn:aws:dynamodb:eu-central-1:552821478383:table/Connect-Outbound-Calling-Table';

const prod = {
  OAUTH_BASE_URL: 'https://nordcloud.okta.com/oauth2/v1',
  OAUTH_CLIENT_ID: '---please add prod oauth client id---', // TODO
};
const dev = {
  OAUTH_BASE_URL: 'https://dev-nordcloud.okta.com/oauth2/v1',
  OAUTH_CLIENT_ID: '0oa8r5pc7cz42WPxW5d7',
};

export const stageConsts = {
  prod,
  dev,
  local: dev,
} satisfies StageConsts;

export const HTML_DIR = path.join(__dirname, 'html');
export const HANDLERS_DIR = path.join(__dirname, 'handlers');
