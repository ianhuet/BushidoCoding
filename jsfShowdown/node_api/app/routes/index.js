'use strict';

const dataRoutes = require('./data_routes');

module.exports = function (app, db) {
    dataRoutes(app, db);
};
