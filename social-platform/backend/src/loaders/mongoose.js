const mongoose = require('mongoose');
const config = require('../config');

// mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.createConnection(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

module.exports = connection;