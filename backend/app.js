const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('./config.json');

// pour l'authentification des users et l'interception d'erreurs
const jwt = require('./_helpers/jwt');

// pour interception et gestion des erreurs des erreurs
const errorHandler = require('./_helpers/error-handler');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', express.static(path.join(__dirname, '../public')));

app.use(jwt());

// STEP 1
const datasetTestRoute = require('./routes/dataset-test.route');
app.use('/api-dataset-test', datasetTestRoute);
console.log('app.js: ', datasetTestRoute)


// STEP 1.1
const pebbleMaisRoute = require('./routes/pebble-mais.route')
const pebblegraphhistoS1Route = require('./routes/pebble-graph-histo-s1.route');
app.use('/api-pebble-mais', pebbleMaisRoute);
app.use('/api-pebble-graph-histo-s1', pebblegraphhistoS1Route);


// STEP 1.2
const pebbleSelectCoomRoute = require('./routes/pebble-select-coom.route')
const pebblegraphhistoS0Route = require('./routes/pebble-graph-histo-s0.route');
app.use('/api-pebble-select-coom', pebbleSelectCoomRoute);
app.use('/api-pebble-graph-histo-s0', pebblegraphhistoS0Route);

// STEP 1.2.1
const sightSelectCoRoute = require('./routes/sight-select-co.route')
const sightGraphSelectCoRoute = require('./routes/sight-graph-select-co.route')
app.use('/api-sight-select-co', sightSelectCoRoute);
app.use('/api-sight-graph-co', sightGraphSelectCoRoute);


// STEP 1.2.2 (to do)
const sightSelectOmRoute = require('./routes/sight-select-om.route')
const sightGraphOmRoute = require('./routes/sight-graph-select-om.route')
app.use('/api-sight-select-om', sightSelectOmRoute);
app.use('/api-sight-graph-om', sightGraphOmRoute);


// users
app.use('/users', require('./users/users.controller'));
app.use(errorHandler);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});


module.exports = app;
