const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Dataset
const PebbleGraphHistoS1Model = new Schema({
   _id:             {type: String},
   sc_test:         {type: Number},
   sc_context:      {type: Number},
   h_context:       {type: Number},
   dataset:         {type: String},
   key_pebble:      {type: String},
   ts_date:         {type: Date},
   ts_h0:           {type: Number},
   ts_h1:           {type: Number}
},
{
   collection: 'dba_gra_s1'
});

module.exports = mongoose.model('PebbleGraphHistoS1Model', PebbleGraphHistoS1Model);

