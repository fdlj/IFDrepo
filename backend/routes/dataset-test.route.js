const express = require('express');
const app = express();
const datasetTestRoute = express.Router();
const DatasetTestModel = require('../models/Dataset-test.model');

datasetTestRoute.route('/read/:user').get((req, res) => {
    console.log('user connexion', req.params.user);
    DatasetTestModel.aggregate([
        {$match: {$or: [{user:req.params.user}, {user: 'arbiter'}]}},
        {$group: {_id: {
            sc_test: "$sc_test", 
            dataset: "$dataset", 
            ar_test: "$ar_test"}, 
            items: {'$addToSet': {user: '$user', pop_sight_sel: '$pop_sight_sel'}}}},
        {$project: {tmp: {$arrayToObject: {$zip: {inputs: ['$items.user', '$items.pop_sight_sel']}}}}}, 
        {$addFields: {'tmp.sc_test': '$_id.sc_test', 'tmp.dataset': '$_id.dataset', 'tmp.ar_test': '$_id.ar_test'}}, 
        {$replaceRoot: {newRoot: '$tmp'}}, 
        {$lookup: {
            from: 'dba_sc_test', let: {firstkey: '$sc_test', secondkey: '$dataset'}, 
            pipeline: [
                {$match: {
                    $expr: {
                    $and: [{$eq:['$sc_test', '$$firstkey']},{$eq:['$dataset', '$$secondkey']}]
                    }}}], 
            as: 'result'}}, 
        {$replaceRoot:  {newRoot: {$mergeObjects: 
            [{'$arrayElemAt': ['$result', 0]},
            {ar_test: '$$ROOT.ar_test', pop_sight_sel_arbiter: '$$ROOT.arbiter',
            pop_sight_sel_user: {$cond: [{$gte: ['$$ROOT.leu', 0]}, '$$ROOT.leu', '$$ROOT.fdlj']},
            pop_sight_sel_user_name: {$cond: [{$gte: ['$$ROOT.leu', 0]}, 'leu', 'fdlj']}
            }]}}}
    ],
        function(error, data)
        {if (error) {
        return next(error)
        } else {
        res.json(data)
        }}
    ).sort({"dataset":1,"sc_test":1,"ar_test":1})   
})

module.exports = datasetTestRoute;


// OLD REQ
// {$lookup: {
//     from:"dba_sc_test",
//     localField:"sc_test",
//     foreignField:"sc_test",
//     as: "result"}},
// {$match:{user:req.params.user}},
// {$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:["$result",0]},"$$ROOT"]}}},
// {$project:{ result:0}}