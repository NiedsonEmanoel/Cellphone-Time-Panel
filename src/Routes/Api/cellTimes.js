const express = require('express');
const cell = express.Router();

cell.get('/times', (req, res)=> res.send({"working": "nice"}));
cell.post('/times', (req, res)=>res.send('kkkk'));
cell.put('/times', (req, res)=>res.send('WORKING'));
cell.delete('/times', (req, res)=>res.send('WKING'))

module.exports = cell;