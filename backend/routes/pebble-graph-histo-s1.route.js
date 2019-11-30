const express = require('express');
const app = express();
const pebbleGraphHistoS1Route = express.Router();

const PebbleGraphHistoS1Model = require('../models/Pebble-graph-histo-s1.model');

pebbleGraphHistoS1Route.route('/read/:sctest/:dataset/:pebble').get((req, res) => {
  //console.log('pebbleGraphHistoS1Route.route : sc_test + dataset + pebble',req.params.sctest,req.params.dataset,req.params.pebble)
  PebbleGraphHistoS1Model.find({sc_test:req.params.sctest,dataset:req.params.dataset,key_pebble:req.params.pebble}, function(error, data)  {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({"ts_date":1})
})

module.exports = pebbleGraphHistoS1Route;