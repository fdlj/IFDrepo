const express = require('express');
const app = express();
const sightGraphSelectOmRoute = express.Router();

const sightGraphSelectOmModel = require('../models/Sight-graph-select-om.model');

sightGraphSelectOmRoute.route('/read/:sctest/:dataset/:pebble/:sight?').get((req, res) => {
  //console.log('sightGraphSelectOmRoute.route : sctest + hcontext + dataset + pebble + sight',req.params.sctest,req.params.hcontext,req.params.dataset,req.params.sight)

  if (req.params.sight){
    //console.log("dde d'un seul sight pour sightGraphSelectOmModel")
    sightGraphSelectOmModel.find({sc_test:req.params.sctest,dataset:req.params.dataset,key_pebble:req.params.pebble,key_sight:req.params.sight}, function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"ts_date":1})

  } else {
    //console.log("dde de tous les sights pour sightGraphSelectOmModel")
    sightGraphSelectOmModel.find({sc_test:req.params.sctest,dataset:req.params.dataset,key_pebble:req.params.pebble}, function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"ts_date":1})
  }
})

module.exports = sightGraphSelectOmRoute;