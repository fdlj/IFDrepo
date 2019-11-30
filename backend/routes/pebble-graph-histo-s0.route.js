const express = require('express');
const app = express();
const pebbleGraphHistoS0Route = express.Router();

const PebbleGraphHistoS0Model = require('../models/Pebble-graph-histo-s0.model');

pebbleGraphHistoS0Route.route('/read/:hcontext/:dataset/:pebble').get((req, res) => {
  //console.log('pebbleGraphHistoS0Route.route : h_context + dataset + pebble',req.params.hcontext,req.params.dataset,req.params.pebble)
  PebbleGraphHistoS0Model.find({h_context:req.params.hcontext,dataset:req.params.dataset,key_pebble:req.params.pebble}, function(error, data)  {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({"ts_date":1})
})

module.exports = pebbleGraphHistoS0Route;