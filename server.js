const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      path = require('path'),
      bodyParser = require('body-parser');

// require dotenv to populate environment variables
require('dotenv').config();

// load config
const config = require('config');

// use bluebird for Mongoose promises
mongoose.Promise = require('bluebird');

// create express app
const app = express();

// set up mongoose/mongo connection
// build db uri
let dbURI = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds133162.mlab.com:33162/pinterest-clone';

// change database uri if testing
if (config.util.getEnv('NODE_ENV') == 'test') {
    dbURI = 'mongodb://localhost:27017/nightlifetest';
}

// connect to the database
mongoose.connect(dbURI);

// on error
mongoose.connection.on('error', (err) => {
    console.info('Database error: ' + err);
});

// port number
const port = process.env.PORT || 8080;

// routes


// use morgan logger except during testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

// cors middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// set up express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes


// catchall redirect
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// server start
app.listen(port, () => {
    console.info('Server listening on port %s\n', port);
});
