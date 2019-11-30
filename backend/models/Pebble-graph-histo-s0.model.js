const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Dataset
const PebbleGraphHistoS0Model = new Schema({
   _id:             {type: String},
   h_context:       {type: Number},
   dataset:         {type: String},
   key_pebble:      {type: String},
   ts_date:         {type: Date},
   ts_h:            {type: Number},
},
{
   collection: 'dba_gra_s0'
});

module.exports = mongoose.model('PebbleGraphHistoS0Model', PebbleGraphHistoS0Model);

