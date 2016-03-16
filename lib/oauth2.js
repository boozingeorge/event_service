var config = require('../config/config');

module.exports = require('simple-oauth2')({
  clientID: config.oauth2.clientId,
  clientSecret: config.oauth2.clientSecret,
  site: config.oauth2.site,
  tokenPath: config.oauth2.tokenPath,
  authorizationPath: config.oauth2.authorizationPath
});