const express = require('express');
const app = express();
const sightSelectCoRoute = express.Router();

const SightSelectCoModel = require('../models/Sight-select-co.model');



sightSelectCoRoute.route('/read/:sctest/:artest/:dataset/:pebble/:user').get((req, res) => {
  //console.log('pebbleheader.route : sctest + artest + dataset + pebble + user',
    // req.params.sctest, 
    // req.params.artest,
    // req.params.dataset,
    // req.params.pebble,
    // req.params.user)

    // convertion des paramétres String en Numérique pour pouvoir servir dans les variables de conditiion de la requète
    const artest_NUM = Number(req.params.artest)
    const sctest_NUM = Number(req.params.sctest)
 
    SightSelectCoModel.aggregate(
        [
            {
              '$match': {
                '$or': [
                  {
                    'user': req.params.user
                  }, {
                    'user': 'arbiter'
                  }
                ], 
                '$and': [
                  {
                    'dataset': req.params.dataset
                  }, {
                    'key_pebble': req.params.pebble
                  },{
                    'sc_test': sctest_NUM
                  }, {
                    'ar_test': artest_NUM
                  }
                ]
              }
            }, {
              '$addFields': {
                'sight_fav_user': 'sight_fav_user'
              }
            }, {
              '$group': {
                '_id': {
                  'sc_test': '$sc_test', 
                  'dataset': '$dataset', 
                  'ar_test': '$ar_test', 
                  'key_pebble': '$key_pebble', 
                  'key_sight': '$key_sight'
                }, 
                'items': {
                  '$addToSet': {
                    'mais_d2': '$mais_d2', 
                    'key_sight': '$key_sight', 
                    'user_sel': '$user', 
                    'sight_sel': '$sight_sel', 
                    'sight_fav_user': 'sight_fav_user', 
                    'sight_fav': '$sight_fav'
                  }
                }
              }
            }, {
              '$project': {
                'sel': {
                  '$arrayToObject': {
                    '$zip': {
                      'inputs': [
                        '$items.user_sel', '$items.sight_sel'
                      ]
                    }
                  }
                }, 
                'fav': {
                  '$arrayToObject': {
                    '$zip': {
                      'inputs': [
                        '$items.sight_fav_user', '$items.sight_fav'
                      ]
                    }
                  }
                }
              }
            }, {
              '$addFields': {
                'sel.sc_test': '$_id.sc_test', 
                'sel.dataset': '$_id.dataset', 
                'sel.ar_test': '$_id.ar_test', 
                'sel.key_pebble': '$_id.key_pebble', 
                'sel.key_sight': '$_id.key_sight', 
                'sel.sight_fav_user': '$fav.sight_fav_user'
              }
            }, {
              '$replaceRoot': {
                'newRoot': '$sel'
              }
            }, {
              '$lookup': {
                'from': 'dba_sight_sel_co', 
                'let': {
                  'key_1': '$sc_test', 
                  'key_2': '$dataset', 
                  'key_3': '$key_pebble', 
                  'key_4': '$key_sight'
                }, 
                'pipeline': [
                  {
                    '$match': {
                      '$expr': {
                        '$and': [
                          {
                            '$eq': [
                              '$sc_test', '$$key_1'
                            ]
                          }, {
                            '$eq': [
                              '$dataset', '$$key_2'
                            ]
                          }, {
                            '$eq': [
                              '$key_pebble', '$$key_3'
                            ]
                          }, {
                            '$eq': [
                              '$key_sight', '$$key_4'
                            ]
                          }
                        ]
                      }
                    }
                  }
                ], 
                'as': 'result'
              }
            }, {
              '$replaceRoot': {
                'newRoot': {
                  '$mergeObjects': [
                    {
                      '$arrayElemAt': [
                        '$result', 0
                      ]
                    }, {
                      'sight_fav_user': '$$ROOT.sight_fav_user', 
                      'ar_test': '$$ROOT.ar_test', 
                      'sight_sel_arbiter': '$$ROOT.arbiter', 
                      'sight_sel_user': {
                        '$cond': [
                          {
                            '$gte': [
                              '$$ROOT.leu', 0
                            ]
                          }, '$$ROOT.leu', '$$ROOT.fdlj'
                        ]
                      }, 
                      'sight_sel_user_name': {
                        '$cond': [
                          {
                            '$gte': [
                              '$$ROOT.leu', 0
                            ]
                          }, 'leu', 'fdlj'
                        ]
                      }
                    }
                  ]
                }
              }
            }, {
              '$lookup': {
                'from': 'dba_sight_pr_co', 
                'let': {
                  'key_1': '$sc_test', 
                  'key_2': '$dataset', 
                  'key_3': '$key_pebble', 
                  'key_4': '$key_sight'
                }, 
                'pipeline': [
                  {
                    '$match': {
                      '$expr': {
                        '$and': [
                          {
                            '$eq': [
                              '$sc_test', '$$key_1'
                            ]
                          }, {
                            '$eq': [
                              '$dataset', '$$key_2'
                            ]
                          }, {
                            '$eq': [
                              '$key_pebble', '$$key_3'
                            ]
                          }, {
                            '$eq': [
                              '$key_sight', '$$key_4'
                            ]
                          }
                        ]
                      }
                    }
                  }
                ], 
                'as': 'result'
              }
            }, {
              '$replaceRoot': {
                'newRoot': {
                  '$mergeObjects': [
                    {
                      '$arrayElemAt': [
                        '$result', 0
                      ]
                    }, {
                      'ar_test': '$$ROOT.ar_test', 
                      'SeeAmb': '$$ROOT.SeeAmb', 
                      'mod': '$$ROOT.mod', 
                      'traitement': '$$ROOT.traitement', 
                      'kpi_len_ts_h': '$$ROOT.kpi_len_ts_h', 
                      'kpi_cs_net_pop': '$$ROOT.kpi_cs_net_pop', 
                      'kpi_r2d': '$$ROOT.kpi_r2d', 
                      'kpi_madr': '$$ROOT.kpi_madr', 
                      'kpi_madr6': '$$ROOT.kpi_madr6', 
                      'kpi_cs_perf_av': '$$ROOT.kpi_cs_perf_av', 
                      'kpi_trend_evol': '$$ROOT.kpi_trend_evol', 
                      'kpi_trend_bias_start': '$$ROOT.kpi_trend_bias_start', 
                      'kpi_trend_bias_end': '$$ROOT.kpi_trend_bias_end', 
                      'kpi_cs_bias_start': '$$ROOT.kpi_cs_bias_start', 
                      'kpi_cs_bias_end': '$$ROOT.kpi_cs_bias_end', 
                      'see_nb': '$$ROOT.see_nb', 
                      'see_status': '$$ROOT.see_status', 
                      'lee_nb': '$$ROOT.lee_nb', 
                      'lee_status': '$$ROOT.lee_status', 
                      'sight_sel_arbiter': '$$ROOT.sight_sel_arbiter', 
                      'sight_sel_user': '$$ROOT.sight_sel_user', 
                      'sight_sel_user_name': '$$ROOT.sight_sel_user_name', 
                      'sight_fav_user': '$$ROOT.sight_fav_user'
                    }
                  ]
                }
              }
            }
          ],

    function(error, data)  {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({"key_sight":1})
  })

  module.exports = sightSelectCoRoute;