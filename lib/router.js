var express = require('express'),
    path = require('path'),
    os = require("os"),
    oauth2 = require('./oauth2');
    
var router = express.Router();

/*
 * OAuth2 routes
 */
router.get('/login', function (req, res) {
  var redirectURI = req.protocol + '://' + req.headers.host + '/oauth2/callback';
  var state = require('crypto').randomBytes(16).toString('hex');
  var authorizationURI = oauth2.authCode.authorizeURL({
    redirect_uri: redirectURI,
    scope: false,
    state: state,
  });
  res.redirect(authorizationURI);
});

router.get('/oauth2/callback', function (req, res, next) {
  var code = req.query.code;
  var redirectURI = req.protocol + '://' + req.headers.host + '/oauth2/callback';
  
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: redirectURI,
  }, function(error, result) {
    if (error) {
      next(new Error("Access token error"));
      return;
    }
    req.session.token = oauth2.accessToken.create(result);
    res.redirect('/');
  });
});

router.get('/logout', function (req, res, next) {
  req.session.user = null;
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