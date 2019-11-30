const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for SightSelectCo
const SightSelectOm = new Schema({
    _id:                        {type: String},
    sc_test:                    {type: Number},
    pr_test:                    {type: Number},
    dataset:                    {type: String},
    key_pebble:                 {type: String},
    mais_d2:                    {type: String},
    key_sight:                  {type: Number},
    sight_class_prob:           {type: Number},
    ar_test:                    {type: Number},
    sc_context:                 {type: Number},
    h_context:                  {type: Number},
    mod:                        {type: String},
    algo:                       {type: String},
    tce:                        {type: Number},
    ts_sm:                      {type: Number},
    cs_sm:                      {type: Number},
    z_end:                      {type: Number},
    ozzzo:                      {type: Number},
    drop:                       {type: Number},
    kpi_len_ts_h:               {type: Number},
    kpi_madr:                   {type: Number},
    sight_sel_arbiter:          {type: Number},
    sight_sel_user:             {type: Number},
    sight_sel_user_name:        {type: String},
    sight_fav_user:             {type: Number}
},
{
    collection: 'dba_sight_ar_om'
});

module.exports = mongoose.model('SightSelectOm', SightSelectOm);

