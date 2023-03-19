import { APIGatewayProxyEventV2 } from 'aws-lambda';
import cookie from 'cookie';

export function getCookie(event: APIGatewayProxyEventV2, cookieName: string) {
  if (!event.cookies || !event.cookies.length) {
    return undefined;
  }

  const cookies = cookie.parse(event.cookies.join(';'));

  return cookies[cookieName] as string | undefined;
}
