var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    redis = require("redis"),
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    debug = require('debug')('event-service'),
    config = require('./config/config'),
    http = require('http');

var port = config.port;
var app = express();
var RedisStore = require('connect-redis')(session);
var redisClient  = redis.createClient();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookies and sessions
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    client: redisClient,
    ttl: config.redis.ttl
  }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// routing
app.use(require('./lib/router'));

// error handler
app.use(function(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    res.render('error', {
      error_code: err.code || 500,
      error_message: err.message || 'Internal Server Error',
    });
  } else {
    res.render('error', {
      error_code: 500,
      error_message: 'Internal Server Error',
    });
  }
});

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
