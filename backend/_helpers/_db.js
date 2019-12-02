// const config = require('config.json');
// const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
// mongoose.Promise = global.Promise;




const config = require('../config.json');
const mongoose = require('mongoose');
dbConfiguser = require('../database/dbusers');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfiguser.db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log('_db.js   Database ',dbConfiguser,' sucessfully connected')
     },
     error => {
        console.log('_db.js   Database ',dbConfiguser,'could not connected: ' + error)
     }
  )

module.exports = {
    User: require('../users/user.model')
};


