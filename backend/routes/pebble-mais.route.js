const express = require('express');
const app = express();
const pebbleMaisRoute = express.Router();

const PebbleMaisModel = require('../models/Pebble-mais.model');



pebbleMaisRoute.route('/read/:sctest/:hcontext/:dataset').get((req, res) => {
  //console.log('pebbleheader.route : sctest + hcontext + dataset',req.params.sctest,req.params.hcontext,req.params.dataset)
  PebbleMaisModel.find({sc_test:req.params.sctest,h_context:req.params.hcontext,dataset:req.params.dataset}, function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"key_pebble":1})
  })

  module.exports = pebbleMaisRoute;


// // Add PebbleHeader
// pebbleheaderRoute.route('/create').post((req, res, next) => {
//   PebbleheaderModel.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// });

// // Get single PebbleHeader
// pebbleheaderRoute.route('/read/:id').get((req, res) => {
//   PebbleheaderModel.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })
