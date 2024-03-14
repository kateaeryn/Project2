const mongoose = require('mongoose');
const config = require('../config/database.js');
mongoose.Promise = global.Promise;

const dataBase = {};
dataBase.mongoose = mongoose;
dataBase.URL = config.url;
dataBase.user = require('./users.js')(mongoose);
dataBase.book = require('./books.js')(mongoose);

module.exports = dataBase;
