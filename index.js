/* eslint-disable prefer-arrow-callback */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
require('newrelic');
const express = require('express');

const app = express();
const cors = require('cors');
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

app.use(express.json());

app.use(cors());

app.get('/qa/questions', function getQuestions(req, res) {
  const { product_id, page, count } = req.query;
  getQuestionsAndAnswers(product_id, count, (results) => {
    res.send(results);
  });
});

app.get('/qa/questions/:question_id/answers', function getAns(req, res) {
  const { question_id } = req.params;
  const { page, count } = req.query;
  getAnswers(question_id, page, count, (results) => {
    res.send(results);
  });
});

app.post('/qa/questions', function postQ(req, res) {
  const {
    body, name, email, product_id,
  } = req.body;
  postQuestionsAndAnswers(body, name, email, product_id, (results) => {
    res.sendStatus(201);
  });
});

app.post('/qa/questions/:question_id/answers', function postA(req, res) {
  const { question_id } = req.params;
  const {
    body, name, email, photos,
  } = req.body;
  postAnswers(question_id, body, name, email, photos, (results) => {
    res.sendStatus(201);
  });
});

app.put('/qa/questions/:question_id/helpful', function putQuestH(req, res) {
  const { question_id } = req.params;
  putQuestionHelpful(question_id, (results) => {
    res.sendStatus(204);
  });
});

app.put('/qa/questions/:question_id/report', function putQuestR(req, res) {
  const { question_id } = req.params;
  putQuestionReport(question_id, (results) => {
    res.sendStatus(204);
  });
});

app.put('/qa/answers/:answer_id/helpful', function putAnsH(req, res) {
  const { answer_id } = req.params;
  putAnswerHelpful(answer_id, (results) => {
    res.sendStatus(204);
  });
});

app.put('/qa/answers/:answer_id/report', function putAnsR(req, res) {
  const { answer_id } = req.params;
  putAnswerReport(answer_id, (results) => {
    res.sendStatus(204);
  });
});

app.listen(4000);
