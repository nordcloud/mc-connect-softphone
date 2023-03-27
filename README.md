# MC Connect Softphone

## Development

Export your AWS credentials as env variables (or use [aws-vault](https://github.com/99designs/aws-vault)).

AWS role: *arn:aws:iam::552821478383:role/Nordcloud-MC-Connect*

Start local API:
- Run Docker
- `npm install`
- `npm start` 
- Go to http://localhost:3000

Optional URL params:
- `mock_login` - skips login
- `mock_db` - skips call to dynamodb

The server will restart on every file change. If it crashes - restart it manually. Changes in in the *src/assets* folder are picked without restarting the server.

Troubleshooting:
- *Session expired* — You need to log in with *AWS Connect SAML SSO*. Look for the link in [id.nordcloud.com](https://id.nordcloud.com). If you don't see the link [request access](https://nordcloud.atlassian.net/servicedesk/customer/portal/223/group/327/create/2570).
- *The security token included in the request is invalid* — The AWS credentials are expired or missing. Lambda is trying to connect to DynamoDB.

## Deployment

**dev**: `npm run deploy:dev`.

**prod**: Push to `main` branch.

## Environments

**dev**: https://cx1wq7djx5.execute-api.eu-central-1.amazonaws.com

**prod**: https://t2yzyfrm23.execute-api.eu-central-1.amazonaws.com

## Okta integration
* Sign-in method: OIDC - OpenID Connect
* Application type: Single-Page Application
* Proof Key for Code Exchange (PKCE): enabled
* Grant type: Authorization Code
* Sign-in redirect URIs: api-url/login-callback
* Sign-out redirect URIs: api-url

## Amazon Connect integration
[Connect AWS console](https://eu-central-1.console.aws.amazon.com/connect/v2/app/settings/flows?region=eu-central-1) 
* In "Approved origins": add urls for prod, dev and localhost.
* In "Contact flows": Add the "connect-contact-flow" lambda for prod and dev.

[Connect Dashboard](https://nordcloud-connect.my.connect.aws/home) > Contact Flow > Whisper Outbound Flow
* Add a "Invoke AWS Lambda function* block. Choose the lambda for "connect-contact-flow". Add a function input parameter - Destination Key: `Username`, (Set Dynamically) Namespace: *Agent*, Value: *User name*. Timeout: 8
* Add a "Call Phone Number” block, link it to the the previous block. Set "Caller ID number to display" > User Attribute > Namespace: External > Value: `caller_id`,

## Todo
- Setup Okta for prod
- Add `OAUTH_CLIENT_ID` for prod to `src/consts`
- Add prod api url to AWS Connect [Approved domains](https://eu-central-1.console.aws.amazon.com/connect/v2/app/settings/approved-origins)
