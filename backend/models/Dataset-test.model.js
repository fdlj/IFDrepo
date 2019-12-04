const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for request result on DatasetAR
const DatasetTest = new Schema({
_id:                        {type: String},
sc_test:                    {type: Number},
sc_context:                 {type: Number},
h_context:                  {type: Number},
ar_test:                    {type: Number},
dataset:                    {type: String},
pop_all:                    {type: Number},
pop_raw_h:                  {type: Number},
pop_co:                     {type: Number},
pop_om:                     {type: Number},
pop_co_good:                {type: Number},
pop_om_good:                {type: Number},
pop_sight_sel_arbiter:      {type: Number},
pop_sight_sel_user:         {type: Number},
pop_sight_sel_user_name:    {type: String}

},
{
   // nom de collection différent du 1er paramétre de mongoose.model, donc il faut le précisier, sinon le nom de la collection serait 'Dataset'
   // nom de collection correspond à la collection sur laquelle la requête est lancée
   collection: 'dba_sc_test_user'
});

module.exports = mongoose.model('DatasetTest', DatasetTest);
