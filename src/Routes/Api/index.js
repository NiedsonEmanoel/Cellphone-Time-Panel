const express = require('express');
const api = express.Router();

api.use('/cell', require('./cellTimes'));

module.exports = api;