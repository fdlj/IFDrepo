const express = require('express');
const app = express();
const sightGraphSelectCoRoute = express.Router();

const sightGraphSelectCoModel = require('../models/Sight-graph-select-co.model');

sightGraphSelectCoRoute.route('/read/:sctest/:dataset/:pebble/:sight?').get((req, res) => {
  //console.log('sightGraphSelectCoRoute.route : sctest + hcontext + dataset + pebble + sight',req.params.sctest,req.params.hcontext,req.params.dataset,req.params.sight)

  if (req.params.sight){
    //console.log("dde d'un seul sight pour sightGraphSelectCoModel")
    sightGraphSelectCoModel.find({sc_test:req.params.sctest,dataset:req.params.dataset,key_pebble:req.params.pebble,key_sight:req.params.sight}, function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"ts_date":1})

  } else {
    //console.log("dde de tous les sights pour sightGraphSelectCoModel")
    sightGraphSelectCoModel.find({sc_test:req.params.sctest,dataset:req.params.dataset,key_pebble:req.params.pebble}, function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"ts_date":1})
  }
})

module.exports = sightGraphSelectCoRoute;