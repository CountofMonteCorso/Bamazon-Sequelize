// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies ***

// requiring in the Express module
const express = require('express');
// requiring in the path package need for referening absolute paths used by the HTML files
const path = require('path');
// enstantiate the Express application
const app = express();

// setting up the port number for Heroku and local host
var PORT = process.env.PORT || 8000;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing.
// Allows the data to be in a readable json format.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets our server to reference the public directory for static assets
app.use(express.static(path.join(__dirname, '/public')));

// *** Routes ***
require('./routes/api_routes.js')(app);
require('./routes/html_routes.js')(app);


// Syncing sequelize models and then starting our Express app on listener port
db.sequelize.sync().then(function() {
app.listen(PORT, function() {
  console.log(`App listening on PORT http://localhost:${PORT}`);
  });
});

//exports express instance and used by apiTest file for route testing. 
module.exports = app;

