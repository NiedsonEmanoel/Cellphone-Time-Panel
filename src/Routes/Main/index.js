const express = require('express');
const path = require('path');
const main = express.Router();
const staticFilesDir = path.resolve('./', 'Views', 'build');

main.use(express.static(`${staticFilesDir}`));
main.get('/*', (req, res)=> res.sendFile('index.html', {root: staticFilesDir}));

module.exports = main;