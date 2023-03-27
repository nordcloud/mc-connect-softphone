import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { HttpMethod } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

import { APP_NAME } from '../consts';
import { createLambda } from '../utils/constructsHelpers/createLambda';
import { trimTrailingSlash } from '../utils/trimTrailingSlash';

type Props = {
  assetsUrl: string;
  customersTable: ITable;
  callerIdTable: Table;
};

export class Api extends Construct {
  public readonly apiUrl: string;

  constructor(scope: Construct, { assetsUrl, customersTable, callerIdTable }: Props) {
    super(scope, 'Api');

    const api = new HttpApi(this, `${APP_NAME}-api`);
    const API_URL = trimTrailingSlash(api.url as string);
    const LOGIN_CALLABCK_URL = `${API_URL}/oauth-callback`;
    this.apiUrl = API_URL;

    // Root path

    const rootFn = createLambda(this, 'api-root-GET', {
      environment: {
        LOGIN_CALLABCK_URL,
        ASSETS_URL: assetsUrl,
      },
    });

    customersTable.grantReadData(rootFn);
    callerIdTable.grantWriteData(rootFn);

    api.addRoutes({
      path: '/',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('api-root-GET-integration', rootFn),
    });

    // "/oauth-callback"

    api.addRoutes({
      path: '/oauth-callback',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'api-oauth-callback-GET-integration',
        createLambda(this, 'api-oauth-callback-GET', {
          environment: {
            LOGIN_CALLABCK_URL,
          },
        })
      ),
    });

    // "/logout"

    api.addRoutes({
      path: '/logout',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'api-logout-GET-integration',
        createLambda(this, 'api-logout-GET', {
          environment: {
            API_URL,
          },
        })
      ),
    });

    // "/caller-id"

    const callerIdFn = createLambda(this, 'api-caller-id-PUT');

    callerIdTable.grantWriteData(callerIdFn);

    api.addRoutes({
      path: '/caller-id',
      methods: [HttpMethod.PUT],
      integration: new HttpLambdaIntegration('api-caller-id-PUT-integration', callerIdFn),
    });
  }
}
