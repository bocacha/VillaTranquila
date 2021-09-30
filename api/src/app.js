
const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const { auth, requiresAuth} = require('express-openid-connect');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');


require('./db.js');

const server = express();

server.name = 'API';

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL:"https://villatranquila.herokuapp.com/" ,
  clientID: "X0L9KdnZ9YanIX48yvB1cP0itcWp4zU2",
  issuerBaseURL:"https://dev-2py8q024.us.auth0.com/" ,
  secret:"5a64dw6f5h4f64u6ft565eqa6wq65w4x4vb78x78def65e4qwd8adshs"
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
server.use(auth(config));

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-2py8q024.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://villatranquila.herokuapp.com/',
  issuer: `https://dev-2py8q024.us.auth0.com/`,
  algorithms: ['RS256']
});

// req.isAuthenticated is provided from the auth router
server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

server.get('/profile', requiresAuth(),  (req, res) => {
  res.send(JSON.stringify(req.oidc));
});

server.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = jwtAuthz([ 'admin:read' ]);

server.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

server.use(checkJwt);

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(cors());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
