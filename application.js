var express = require('express');
var app = express();
var cnj = require('./cnj');
var springCloud = require('./springCloud');
var configuration = require('./configuration').get();

app.use('/', springCloud.init(configuration));
app.use('/', cnj);

console.log('Starting server on port ' + configuration.serverPort);
app.listen(configuration.serverPort);
