const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Dataset
const SightGraphSelectOm = new Schema({
    _id:                    {type: String},
    sc_test:                {type: Number},
    sc_context:             {type: Number},
    h_context:              {type: Number},
    dataset:                {type: String},
    key_pebble:             {type: String},
    key_sight:              {type: Number},
    ts_date:                {type: Date},
    ts_h0:                  {type: Number},
    ts_h:                   {type: Number},
    ts_p_mod:               {type: Number},
    ts_p_trend:             {type: Number},
    ts_f_mod_a:             {type: Number},
    ts_f_mod_c:             {type: Number},
    ts_f_trend:             {type: Number},
    ts_trend_bias_start:    {type: Number},
    ts_trend_bias_end:      {type: Number},
    ts_see_effect_pos:      {type: Number},
    ts_see_effect_neg:      {type: Number}
},
{
   collection: 'dba_gra_sn_om'
});

module.exports = mongoose.model('SightGraphSelectOm', SightGraphSelectOm);
