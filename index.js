/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const {
  getQuestionsAndAnswers,
  postQuestionsAndAnswers,
  getAnswers,
  postAnswers,
  putQuestionHelpful,
  putQuestionReport,
  putAnswerHelpful,
  putAnswerReport,
} = require('./db/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/qa/questions', (req, res) => {
  const { product_id, page, count } = req.query; // stores the incoming req id number
  getQuestionsAndAnswers(product_id, count, (results) => {
    res.send(results);
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params; // stores the incoming req id number
  const { page, count } = req.query; // stores the incoming query info
  getAnswers(question_id, page, count, (results) => {
    res.send(results);
  });
});

app.post('/qa/questions', (req, res) => {
  const {
    body, name, email, product_id,
  } = req.body;
  postQuestionsAndAnswers(body, name, email, product_id, (results) => {
    res.sendStatus(201);
  });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params; // stores the incoming req id number
  const {
    body, name, email, photos,
  } = req.body;
  postAnswers(question_id, body, name, email, photos, (results) => {
    res.sendStatus(201);
  });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params; // stores the incoming req id number
  putQuestionHelpful(question_id, (results) => {
    res.sendStatus(204);
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params; // stores the incoming req id number
  putQuestionReport(question_id, (results) => {
    res.sendStatus(204);
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params; // stores the incoming req id number
  putAnswerHelpful(answer_id, (results) => {
    res.sendStatus(204);
  });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params; // stores the incoming req id number
  putAnswerReport(answer_id, (results) => {
    res.sendStatus(204);
  });
});

app.listen(4000);
