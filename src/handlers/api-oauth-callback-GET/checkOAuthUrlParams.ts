import { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';

export function checkOAuthUrlParams(
  params?: APIGatewayProxyEventQueryStringParameters
): params is { code: string; state: string } {
  if (!params) {
    console.log('No OAuth params');
    return false;
  }

  if (params.error) {
    console.error(params.error, params.error_description);
    return false;
  }

  if (!params.code) {
    console.log('Missing OAuth "code" param');
    return false;
  }

  if (!params.state) {
    console.log('Missing OAuth "state" param');
    return false;
  }

  return true;
}
