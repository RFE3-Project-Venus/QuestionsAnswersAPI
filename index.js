const express = require('express');
const app = express();
const db = require('./db/index.js');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Howdy from the other side');
});

app.listen(4000);
