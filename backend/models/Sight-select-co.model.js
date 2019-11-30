const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for SightSelectCo
const SightSelectCo = new Schema({
    _id:                        {type: String},
    sc_test:                    {type: Number},
    pr_test:                    {type: Number},
    dataset:                    {type: String},
    key_pebble:                 {type: String},
    mais_d2:                    {type: String},
    key_sight:                  {type: Number},
    sight_class_prob:           {type: Number},
    ar_test:                    {type: Number},
    SeeAmb:                     {type: Number},
    mod:                        {type: String},
    traitement:                 {type: Number},
    kpi_len_ts_h:               {type: Number},
    kpi_cs_net_pop:             {type: Number},
    kpi_r2d:                    {type: Number},
    kpi_madr:                   {type: Number},
    kpi_madr6:                  {type: Number},
    kpi_cs_perf_av:             {type: Number},
    kpi_trend_evol:             {type: Number},
    kpi_trend_bias_start:       {type: Number},
    kpi_trend_bias_end:         {type: Number},
    kpi_cs_bias_start:          {type: Number},
    kpi_cs_bias_end:            {type: Number},
    see_nb:                     {type: Number},
    see_status:                 {type: Number},
    lee_nb:                     {type: Number},
    lee_status:                 {type: Number},
    sight_sel_arbiter:          {type: Number},
    sight_sel_user:             {type: Number},
    sight_sel_user_name:        {type: String},
    sight_fav_user:             {type: Number}
},
{
    collection: 'dba_sight_ar_co'
});

module.exports = mongoose.model('SightSelectCo', SightSelectCo);

