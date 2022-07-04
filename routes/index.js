var router = require('express').Router();
var management = require('../services/management')
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

router.get('/self-service', requiresAuth(), function (req, res, next) {
  res.render('self-service', {
    title: 'Self Service Inbound Idp'
  });
});

router.post('/self-service', requiresAuth(), async function (req, res, next) {
  var result = false
  if(req.body.strategy === 'oidc') {
    result = await management.createOidcConnection(req.body.namef, {
      client_id : req.body.client_id,
      scope: req.body.scope,
      issuer: req.body.issuer,
      authorization_endpoint: req.body.auth_endpoint,
      jwks_uri: req.body.jwks
    })
  }
  else if(req.body.strategy === 'samlp') {
    result = await management.createSamlConnection(req.body.namef, {
      signInEndpoint : req.body.signInEndpoint,
      signingCert : req.body.signingCert
    })
  } 
  if(result) {
    res.render('self-service-success', {
      title: 'Self Service Inbound Idp'
    })
  };
});

module.exports = router;
