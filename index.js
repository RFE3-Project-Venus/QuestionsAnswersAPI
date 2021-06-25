/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { test } = require('./db/index.js');

console.log(test);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  test((results) => {
    res.send(results);
  });
});

app.listen(4000);
