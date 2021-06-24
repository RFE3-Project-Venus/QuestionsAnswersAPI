/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Howdy from the other side');
});

app.listen(4000);
