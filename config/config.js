var config = {};

config.db = {};
config.webhost = 'http://localhost:3000/';

//config.db.host = 'mongo2:27017'; // in case of mongo running with docker-compose up
config.db.host = 'localhost:27017'; // in case of running npm start and mongo local to mac
config.db.name = 'short_urls';

module.exports = config;

