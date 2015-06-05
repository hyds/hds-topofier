var environmentName = process.env.NODE_ENV || 'development',
    config = require('./config.json');
   
module.exports = config;