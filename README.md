# MC Connect Softphone

## Local development

`npm install` 

`npm start` 

Open http://localhost:3000

Use optional URL parameters:
- `mock_user`
- `mock_customers`

## Deployment

Use role `arn:aws:iam::552821478383:role/Nordcloud-MC-Connect`.

**dev**: `npm run deploy:dev`.

**prod**: Push to `main` branch.

## Environments

**dev**: https://cx1wq7djx5.execute-api.eu-central-1.amazonaws.com

**prod**: [todo]

## Okta setup
* Sign-in method: OIDC - OpenID Connect
* Application type: Single-Page Application
* Proof Key for Code Exchange (PKCE): enabled
* Grant type: Authorization Code
* Sign-in redirect URIs: api-url/login-callback
* Sign-out redirect URIs: api-url
