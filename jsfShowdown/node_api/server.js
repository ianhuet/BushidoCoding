'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

const app  = express();
const port = 9000;


// to support JSON-encoded bodies
app.use(bodyParser.json());


require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
});