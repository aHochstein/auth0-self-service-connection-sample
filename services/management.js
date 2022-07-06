const ManagementClient = require('auth0').ManagementClient;

const client = new ManagementClient({
  domain: process.env.MANAGEMENT_DOMAIN,
  clientId: process.env.MANAGEMENT_CLIENT_ID,
  clientSecret:  process.env.MANAGEMENT_CLIENT_SECRET,
  scope: 'create:connections delete:connections',
});

const createOidcConnection = async(name, options) => {
  try {
    var response = await client.createConnection({
      name : name,
      strategy:  "oidc",
      options : {
        client_id : options.client_id,
        scope: options.scope,
        issuer : options.issuer,
        authorization_endpoint: options.authorization_endpoint,
        jwks_uri: options.jwks_uri
      }, 
      enabled_clients : [process.env.MANAGEMENT_SELF_SERVICE_CLIENT_ID]
    })
    return true
  }
  catch(e) {
    console.log(e)
    return false
  }
}

const createSamlConnection = async(name, options) => {
  try {
    await client.createConnection({
      name : name,
      strategy:  "samlp",
      options : {
        signInEndpoint : options.signInEndpoint,
        signingCert : options.signingCert
      },
      enabled_clients : [process.env.MANAGEMENT_SELF_SERVICE_CLIENT_ID]
    })
    return true
  }
  catch(e) {
    console.log(e)
    return false
  }
}

const deleteConnection = async(id) => {
  try {
    await client.deleteConnection({id})
    return true
  }
  catch(e) {
    return false
  }
}


module.exports.createOidcConnection = createOidcConnection
module.exports.createSamlConnection = createSamlConnection
module.exports.deleteConnection = deleteConnection