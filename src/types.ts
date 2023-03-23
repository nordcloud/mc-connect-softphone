import { stageConsts } from './consts';

export type Stage = keyof typeof stageConsts;

export type StageConsts = Record<
  string,
  {
    OAUTH_BASE_URL: string;
    OAUTH_CLIENT_ID: string;
  }
>;

export type OauthAuthorizeResponse =
  | {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope: string;
      refresh_token: string;
      id_token: string;
    }
  | Record<'error' | 'error_description', string>;

export type OauthIntrospectResponse =
  | {
      active: boolean;
      username: string;
      exp: number;
      iat: number;
      sub: string;
      aud: string;
      iss: string;
      jti: string;
      token_type: string;
      at_hash: string;
      idp: string;
      auth_time: number;
      amr: string[];
      name: string;
      preferred_username: string;
      nonce: string;
      email: string;
    }
  | {
      active: false;
    }
  | Record<'error' | 'error_description', string>;

export type IdTokenPayload = {
  sub: string;
  name: string;
  email: string;
  ver: number;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
  amr: string[];
  idp: string;
  nonce: string;
  preferred_username: string;
  auth_time: number;
  at_hash: string;
};

export type User = {
  sub: string;
  name: string;
  email: string;
  idToken: string;
};

export type CustomersTableItem = {
  CustomerId: number;
  CustomerName: string;
  OutboundNumber: string;
};
