const { useAuth0, withAuthenticationRequired } =require ("@auth0/auth0-react");
const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const { auth, requiresAuth} = require('express-openid-connect');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
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

const authorizeAccessToken = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-2py8q024.us.auth0.com/.well-known/jwks.json'
}),
audience: 'https://villatranquila.herokuapp.com/',
issuer: 'https://dev-2py8q024.us.auth0.com/',
algorithms: ['RS256']
});

const checkPermissions = jwtAuthz(["admin:read"], {
  customScopeKey: "permissions",
  checkAllScopes: true
});

const {
  loginWithPopup,
  getAccessTokenWithPopup,
  getAccessTokenSilently
} = useAuth0();

const callRoleBasedEndpoint = async () => {
  try {
    const token = await getAccessTokenSilently();
    console.log(token);
    const response = await fetch('https://villatranquila.herokuapp.com/api/role', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const responseData = await response.json();
    setState({
      ...state,
      showResult: true,
      endpointMessage: responseData
    });
  } catch (error) {
    setState({
      ...state,
      error: error.error
    });
  }
};


server.get("/api/role", authorizeAccessToken, checkPermissions, (req, res) => {
  res.send({
    msg: "You called the role endpoint!"
  });
});

// req.isAuthenticated is provided from the auth router
server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

server.get('/profile', requiresAuth(),  (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
server.get('/api', callRoleBasedEndpoint, (req, res) => {
  res.send('<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1><button onClick={callRoleBasedEndpoint}>prueba</button></body></html>')
})


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
