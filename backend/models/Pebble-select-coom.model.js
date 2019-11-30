const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for request result on PebbleheaderAR
const PebbleSelectCoom = new Schema({
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
    co_status:              {type: Number},
    om_status:              {type: Number},
    ar_test:                {type: Number},
    sight_sel_arbiter:      {type: Number},
    sight_sel_user:         {type: Number},
    sight_sel_user_name:    {type: String}
},
{
    // nom de collection différent du 1er paramétre de mongoose.model, donc il faut le précisier, sinon le nom de la collection serait 'Dataset'
    // nom de collection correspond à la collection sur laquelle la requête est lancée
    collection: 'dba_pebble_list_user'
});

module.exports = mongoose.model('PebbleSelectCoom', PebbleSelectCoom);

