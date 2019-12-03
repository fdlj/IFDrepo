const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log('_db.js   Database ',config.connectionString,' sucessfully connected')
     },
     error => {
        console.log('_db.js   Database ',config.connectionString,'could not connected: ' + error)
     }
  )

module.exports = {
    User: require('../users/user.model')
};
