const express = require('express');
const app = express();
const sightSelectOmRoute = express.Router();

const SightSelectOmModel = require('../models/Sight-select-om.model');



sightSelectOmRoute.route('/read/:sctest/:artest/:dataset/:pebble/:user').get((req, res) => {
  //console.log('sight-select-om.route : sctest + artest + dataset + pebble + user',
    // req.params.sctest, 
    // req.params.artest,
    // req.params.dataset,
    // req.params.pebble,
    // req.params.user)

    // convertion des paramétres String en Numérique pour pouvoir servir dans les variables de conditiion de la requète
    const artest_NUM = Number(req.params.artest)
    const sctest_NUM = Number(req.params.sctest)
 
    SightSelectOmModel.aggregate(
        // [
        //     {
        //       '$match': {
        //         '$or': [
        //           {
        //             'user': req.params.user
        //           }, {
        //             'user': 'arbiter'
        //           }
        //         ], 
        //         '$and': [
        //           {
        //             'dataset': req.params.dataset
        //           }, {
        //             'key_pebble': req.params.pebble
        //           },{
        //             'sc_test': sctest_NUM
        //           }, {
        //             'ar_test': artest_NUM
        //           }
        //         ]
        //       }
        //     }, {
        //       '$addFields': {
        //         'sight_fav_user': 'sight_fav_user'
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'sc_test': '$sc_test', 
        //           'dataset': '$dataset', 
        //           'ar_test': '$ar_test', 
        //           'key_pebble': '$key_pebble', 
        //           'key_sight': '$key_sight'
        //         }, 
        //         'items': {
        //           '$addToSet': {
        //             'mais_d2': '$mais_d2', 
        //             'key_sight': '$key_sight', 
        //             'user_sel': '$user', 
        //             'sight_sel': '$sight_sel', 
        //             'sight_fav_user': 'sight_fav_user', 
        //             'sight_fav': '$sight_fav'
        //           }
        //         }
        //       }
        //     }, {
        //       '$project': {
        //         'sel': {
        //           '$arrayToObject': {
        //             '$zip': {
        //               'inputs': [
        //                 '$items.user_sel', '$items.sight_sel'
        //               ]
        //             }
        //           }
        //         }, 
        //         'fav': {
        //           '$arrayToObject': {
        //             '$zip': {
        //               'inputs': [
        //                 '$items.sight_fav_user', '$items.sight_fav'
        //               ]
        //             }
        //           }
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'sel.sc_test': '$_id.sc_test', 
        //         'sel.dataset': '$_id.dataset', 
        //         'sel.ar_test': '$_id.ar_test', 
        //         'sel.key_pebble': '$_id.key_pebble', 
        //         'sel.key_sight': '$_id.key_sight', 
        //         'sel.sight_fav_user': '$fav.sight_fav_user'
        //       }
        //     }, {
        //       '$replaceRoot': {
        //         'newRoot': '$sel'
        //       }
        //     }, {
        //       '$lookup': {
        //         'from': 'dba_sight_sel_om', 
        //         'let': {
        //           'key_1': '$sc_test', 
        //           'key_2': '$dataset', 
        //           'key_3': '$key_pebble', 
        //           'key_4': '$key_sight'
        //         }, 
        //         'pipeline': [
        //           {
        //             '$match': {
        //               '$expr': {
        //                 '$and': [
        //                   {
        //                     '$eq': [
        //                       '$sc_test', '$$key_1'
        //                     ]
        //                   }, {
        //                     '$eq': [
        //                       '$dataset', '$$key_2'
        //                     ]
        //                   }, {
        //                     '$eq': [
        //                       '$key_pebble', '$$key_3'
        //                     ]
        //                   }, {
        //                     '$eq': [
        //                       '$key_sight', '$$key_4'
        //                     ]
        //                   }
        //                 ]
        //               }
        //             }
        //           }
        //         ], 
        //         'as': 'result'
        //       }
        //     }, {
        //       '$replaceRoot': {
        //         'newRoot': {
        //           '$mergeObjects': [
        //             {
        //               '$arrayElemAt': [
        //                 '$result', 0
        //               ]
        //             }, {
        //               'sight_fav_user': '$$ROOT.sight_fav_user', 
        //               'ar_test': '$$ROOT.ar_test', 
        //               'sight_sel_arbiter': '$$ROOT.arbiter', 
        //               'sight_sel_user': {
        //                 '$cond': [
        //                   {
        //                     '$gte': [
        //                       '$$ROOT.leu', 0
        //                     ]
        //                   }, '$$ROOT.leu', '$$ROOT.fdlj'
        //                 ]
        //               }, 
        //               'sight_sel_user_name': {
        //                 '$cond': [
        //                   {
        //                     '$gte': [
        //                       '$$ROOT.leu', 0
        //                     ]
        //                   }, 'leu', 'fdlj'
        //                 ]
        //               }
        //             }
        //           ]
        //         }
        //       }
        //     }, {
        //       '$lookup': {
        //         'from': 'dba_sight_pr_om', 
        //         'let': {
        //           'key_1': '$sc_test', 
        //           'key_2': '$dataset', 
        //           'key_3': '$key_pebble', 
        //           'key_4': '$key_sight'
        //         }, 
        //         'pipeline': [
        //           {
        //             '$match': {
        //               '$expr': {
        //                 '$and': [
        //                   {
        //                     '$eq': [
        //                       '$sc_test', '$$key_1'
        //                     ]
        //                   }, {
        //                     '$eq': [
        //                       '$dataset', '$$key_2'
        //                     ]
        //                   }, {
        //                     '$eq': [
        //                       '$key_pebble', '$$key_3'
        //                     ]
        //                   }, {
        //                     '$eq': [
        //                       '$key_sight', '$$key_4'
        //                     ]
        //                   }
        //                 ]
        //               }
        //             }
        //           }
        //         ], 
        //         'as': 'result'
        //       }
        //     }, {
        //       '$replaceRoot': {
        //         'newRoot': {
        //           '$mergeObjects': [
        //             {
        //               '$arrayElemAt': [
        //                 '$result', 0
        //               ]
        //             }, {
        //               'ar_test': '$$ROOT.ar_test', 
        //               'sc_context': '$$ROOT.sc_context', 
        //               'h_context': '$$ROOT.h_context', 
        //               'mod': '$$ROOT.mod',
        //               'algo': '$$ROOT.algo', 
        //               'tce': '$$ROOT.tce', 
        //               'ts_sm': '$$ROOT.ts_sm', 
        //               'cs_sm': '$$ROOT.cs_sm', 
        //               'z_end': '$$ROOT.z_end', 
        //               'ozzzo': '$$ROOT.ozzzo', 
        //               'drop': '$$ROOT.drop', 
        //               'kpi_len_ts_h': '$$ROOT.kpi_len_ts_h', 
        //               'kpi_madr': '$$ROOT.kpi_madr', 
        //               'sight_sel_arbiter': '$$ROOT.sight_sel_arbiter', 
        //               'sight_sel_user': '$$ROOT.sight_sel_user', 
        //               'sight_sel_user_name': '$$ROOT.sight_sel_user_name', 
        //               'sight_fav_user': '$$ROOT.sight_fav_user'
        //             }
        //           ]
        //         }
        //       }
        //     }
        //   ],

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
                }, {
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
              'from': 'dba_sight_sel_om', 
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
              'from': 'dba_sight_pr_om', 
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
                    'sc_context': '$$ROOT.sc_context', 
                    'h_context': '$$ROOT.h_context', 
                    'mod': '$$ROOT.mod', 
                    'algo': '$$ROOT.algo', 
                    'tce': '$$ROOT.tce', 
                    'ts_sm': '$$ROOT.ts_sm', 
                    'cs_sm': '$$ROOT.cs_sm', 
                    'z_end': '$$ROOT.z_end', 
                    'ozzzo': '$$ROOT.ozzzo', 
                    'drop': '$$ROOT.drop', 
                    'kpi_len_ts_h': '$$ROOT.kpi_len_ts_h', 
                    'kpi_madr': '$$ROOT.kpi_madr', 
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

  module.exports = sightSelectOmRoute;