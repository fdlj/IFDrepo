const express = require('express');
const app = express();
const pebbleSelectCoomRoute = express.Router();

const PebbleSelectCoomModel = require('../models/Pebble-select-coom.model');



pebbleSelectCoomRoute.route('/read/:sctest/:hcontext/:artest/:dataset/:user').get((req, res) => {
  //console.log('pebbleheader.route : sctest + hcontext + dataset',
    // req.params.sctest, 
    // req.params.hcontext,
    // req.params.artest,
    // req.params.dataset,
    // req.params.user)

    // convertion des paramétres String en Numérique pour pouvoir servir dans les variables de conditiion de la requète
    const artest_NUM = Number(req.params.artest)
    const sctest_NUM = Number(req.params.sctest)
    const hcontext_NUM = Number(req.params.hcontext)
 
    PebbleSelectCoomModel.aggregate([
    {$match: {
        $or:[{user:req.params.user},{user:"arbiter"}],
        $and:[{dataset:req.params.dataset},{sc_test:sctest_NUM},{ar_test:artest_NUM}],}},
    {$group: {
        _id: {
          sc_test: '$sc_test', 
          dataset: '$dataset', 
          ar_test: '$ar_test', 
          key_pebble: '$key_pebble'}, 
        items: {'$addToSet': {user: '$user',sight_sel: '$sight_sel'}}}},
    {$project: {tmp: {'$arrayToObject': {'$zip':{inputs: ['$items.user', '$items.sight_sel']}}}}},
    {$addFields: {'tmp.sc_test': '$_id.sc_test','tmp.dataset': '$_id.dataset','tmp.ar_test': '$_id.ar_test','tmp.key_pebble': '$_id.key_pebble'}},
    {$replaceRoot: {newRoot: '$tmp'}},
    {$lookup: {from: 'dba_pebble_list', 
        let: {firstkey: '$sc_test',secondkey: '$dataset',thirdkey: '$key_pebble'}, 
        pipeline: [
          {$match: {$expr: {$and: [{$eq: ['$sc_test', '$$firstkey']}, {$eq: ['$dataset', '$$secondkey']}, {$eq: ['$key_pebble', '$$thirdkey']}]}}}], 
        as: 'result'}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{'$arrayElemAt': ['$result', 0]}, 
        {ar_test: '$$ROOT.ar_test',
        sight_sel_arbiter: '$$ROOT.arbiter',
        sight_sel_user: {$cond: [{$gte: ['$$ROOT.leu', 0]}, '$$ROOT.leu', '$$ROOT.fdlj']},
        sight_sel_user_name: {$cond: [{$gte: ['$$ROOT.leu', 0]}, 'leu', 'fdlj']}}]}}}],

    function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"key_pebble":1})
  })

  module.exports = pebbleSelectCoomRoute;