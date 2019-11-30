const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for PebbleMais (list of pebbles oriented thru MAIS process)
const PebbleMais = new Schema({
    _id:                    {type: String},
    sc_test:                {type: Number},
    sc_context:             {type: Number},
    h_context:              {type: Number},
    dataset:                {type: String},
    key_pebble:             {type: String},
    key_a1:                 {type: String},
    key_a2:                 {type: String},
    key_a3:                 {type: String},
    key_a4:                 {type: String},
    mais_d1:                {type: String},
    mais_d2:                {type: String},
    len_18:                 {type: Number},
    z_start:                {type: Number},
    z_end:                  {type: Number},
    ozzzO:                  {type: Number}
},
{
    collection: 'dba_pebble_mais_dx'
});

module.exports = mongoose.model('PebbleMais', PebbleMais);