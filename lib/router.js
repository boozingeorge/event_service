var express = require('express'),
    path = require('path'),
    os = require("os"),
    oauth2 = require('./oauth2');
    
var router = express.Router();

/*
 * API methods
 */
router.get('/api/get_access_token', function (req, res) {
  if (!req.session.token) {
    next();
    return;
  }
  var expires_in = req.session.token.expires_in - Math.floor(((new Date().getTime()) - req.session.token.timestamp) / 1000);
  // if less then one second then send error
  if (expires_in < 1) {
    //refresh access token here and send a new one
    res.status(403).send({
      error: "token_expired",
      error_message: "Access Token is expired"
    });
  } else {
    res.status(200).send({
      token: req.session.token.access_token,
      expires_in: expires_in
    });
  }
});

/*
 * OAuth2 routes
 */
router.get('/login', function (req, res) {
  var redirectURI = req.protocol + '://' + req.headers.host + '/oauth2/callback';
  var state = require('crypto').randomBytes(16).toString('hex');
  var authorizationURI = oauth2.authCode.authorizeURL({
    redirect_uri: redirectURI,
    scope: false,
    state: state
  });
  res.redirect(authorizationURI);
});

router.get('/oauth2/callback', function (req, res, next) {
  var code = req.query.code;
  var redirectURI = req.protocol + '://' + req.headers.host + '/oauth2/callback';
  
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: redirectURI
  }, function(error, result) {
    if (error) {
      next(new Error("Access token error"));
      return;
    }
    var tokenData = oauth2.accessToken.create(result).token;
    tokenData.timestamp = new Date().getTime();
    req.session.token = oauth2.accessToken.create(result).token;
    res.redirect('/');
  });
});

router.get('/logout', function (req, res, next) {
  req.session.shared_user = null;
  req.session.token = null;
  res.redirect('/login');
});

router.get('/', function (req, res) {
  if (!req.session.token) {
    res.redirect('/login');
    return;
  }
  res.sendFile(path.resolve(__dirname + '/../app/index.html'));
});

/*
 * Static routes
 */
router.use(express.static(path.join(__dirname, '../app')));

router.use(function(req, res, next) {
    if (!req.session.token) {
      res.redirect('/login');
      return;
    } else {
      res.redirect('/');
      return;
    }
});

module.exports = router;