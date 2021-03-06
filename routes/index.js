var router = require('express').Router();
var management = require('../services/management')
const { requiresAuth } = require('express-openid-connect');
const oidcResolver = require('../services/oidc-configuration-resolver');
const { response } = require('express');

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
    title: 'Self Service Inbound Idp',
    domain: process.env.MANAGEMENT_DOMAIN
  });
});

router.post('/self-service/:id', requiresAuth(), async function (req, res, next) {
  var result = await management.deleteConnection(req.params.id)
  if(result) {
    return res.render('self-service-delete-success', {
      title: 'Self Service Connection Deleted',
    })
  }
});

router.post('/self-service', requiresAuth(), async function (req, res, next) {
  var result = false
  var openIdConfig = await oidcResolver(req.body.config)
  if(req.body.strategy === 'oidc') {
    result = await management.createOidcConnection(req.body.namef, {
      client_id : req.body.client_id,
      scope: req.body.scope,
      issuer: openIdConfig.issuer,
      authorization_endpoint: openIdConfig.authorization_endpoint,
      jwks_uri: openIdConfig.jwks_uri
    })
  }
  else if(req.body.strategy === 'samlp') {
    result = await management.createSamlConnection(req.body.namef, {
      signInEndpoint : req.body.signInEndpoint,
      signingCert : req.body.signingCert
    })
  } 
  if(result.success) {
    return res.render('self-service-success', {
      title: 'Self Service Inbound Idp',
      tryuri: result.tryuri,
      id: result.id
    })
  } 
  else {
    return res.render('self-service', {
      title: 'Self Service Inbound Idp',
      error: result.error
    })
  }
});

module.exports = router;