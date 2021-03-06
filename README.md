# Auth0 Self-Service Enterprise Connection Sample

This sample demonstrates a simple self service app which utelizes management API to add a Enterprise Connection to your tenant. This sample currently supports SAML and OIDC as connection strategy.

This is build upon this sample app [Express Quickstart](https://auth0.com/docs/quickstart/webapp/express).

To run this sample you need a M2M Application with the `create:connections` and `delete:connections` scope against the Auth0 Management API.

## Running This Sample Locally

1. Install the dependencies with npm:

```bash
npm install
```


2. Rename `.env.example` to `.env` and replace or check the following values. 

> ⚠️ Note: If you downloaded this sample app directly from Auth0 Manage Dashboard, or from Auth0 Docs _and_ you chose the Auth0 application you're creating this sample for, then you can check these are configured already: 

- `CLIENT_ID` - your Auth0 application client id
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `MANAGEMENT_DOMAIN` - your Auth0 domain the management client connects against
- `MANAGEMENT_CLIENT_ID` - your Auth0 application client id with permissions against the Management API
- `MANAGEMENT_CLIENT_SECRET` - your Auth0 application client secret
- `MANAGEMENT_SELF_SERVICE_CLIENT_ID` - your Auth0 application client id on which the created connections will be initially enabled
- `MANAGEMENT_TESTER_CLIENT_ID` - your Auth0 application client id to test the connections. To locate this use Management API Get Clients and look for the Client "All Applications" (this one is used to test your connection after creating it)


```bash
mv .env.example .env
```

3. Run the sample app:

```bash
npm start
```

The sample app will be served at `localhost:3000`.

## Support + Feedback

Please use the [Issues queue](https://github.com/auth0-samples/auth0-express-webapp-sample/issues) in this repo for questions and feedback.

## Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## What is Auth0?

Auth0 helps you to easily:

- implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)
- log in users with username/password databases, passwordless, or multi-factor authentication
- link multiple user accounts together
- generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely
- access demographics and analytics detailing how, when, and where users are logging in
- enrich user profiles from other data sources using customizable JavaScript rules

[Why Auth0?](https://auth0.com/why-auth0)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
