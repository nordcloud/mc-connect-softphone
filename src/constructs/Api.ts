import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { HttpMethod } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

import { APP_NAME } from '../consts';
import { createLambda } from '../utils/constructsHelpers/createLambda';
import { trimTrailingSlash } from '../utils/trimTrailingSlash';

type Props = {
  assetsUrl: string;
  customersTable: ITable;
};

export class Api extends Construct {
  public readonly apiUrl: string;

  constructor(scope: Construct, { assetsUrl, customersTable }: Props) {
    super(scope, 'Api');

    const httpApi = new HttpApi(this, `${APP_NAME}-api`);
    const API_URL = trimTrailingSlash(httpApi.url as string);
    const LOGIN_CALLABCK_URL = `${API_URL}/oauth-callback`;

    this.apiUrl = API_URL;

    // Root path

    const webRootFn = createLambda(this, 'web-root', {
      environment: {
        LOGIN_CALLABCK_URL,
        ASSETS_URL: assetsUrl,
      },
    });

    customersTable.grantReadData(webRootFn);

    httpApi.addRoutes({
      path: '/',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('web-root-integration', webRootFn),
    });

    // "/oauth-callback"

    httpApi.addRoutes({
      path: '/oauth-callback',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'oauth-callback-integration',
        createLambda(this, 'oauth-callback', {
          environment: {
            LOGIN_CALLABCK_URL,
          },
        })
      ),
    });

    // "/logout"

    httpApi.addRoutes({
      path: '/logout',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'logout-integration',
        createLambda(this, 'logout', {
          environment: {
            API_URL,
          },
        })
      ),
    });
  }
}
