/* eslint-disable no-console */
const { Pool } = require('pg');
// eslint-disable-next-line import/extensions
// const { USER, PASSWORD, DB } = require('../pass.js');

const pool = new Pool({
  user: 'ag',
  password: 'secret',
  database: 'questions_answers',
  host: 'db',
});

pool.connect()
  .then(() => { console.log('Connected to DB'); })
  .catch((err) => { console.log('Not connected to DB', err); });

const getQuestionsAndAnswers = (id, limit = 5, cb) => {
  const result = {
    product_id: id,
    results: [],
  };
  const sql = `
    SELECT
      questions.question_id,
      questions.question_body,
      questions.question_date,
      questions.asker_name,
      questions.question_helpfulness,
      (CASE WHEN questions.reported = 0 THEN 'false' ELSE 'true' END) as reported,
      (SELECT json_object_agg
        (answers.answer_id,
        json_build_object(
        'id', answers.answer_id,
        'body', answers.body,
        'date', answers.answer_date,
        'answerer_name', answers.answerer_name,
        'helpfulness', answers.question_helpfulness,
        'photos', (SELECT
          array_agg(photos.photo_url) as photos
          FROM photos
          WHERE answers.answer_id = photos.answer_id)
        )
      )
      FROM answers
      WHERE questions.question_id = answers.question_id
      AND answers.reported = 0
     ) AS answers
    FROM questions
    WHERE questions.product_id = ${id}
    AND questions.reported = 0
    LIMIT ${limit};`;
  pool.query(sql)
    .then((questions) => {
      result.results = questions.rows;
      cb(result);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const getAnswers = (id, answerPage, answerCount, cb) => {
  const result = {
    question: id,
    page: answerPage,
    count: answerCount,
    results: [],
  };
  const sql = `SELECT
    answers.answer_id,
    answers.body,
    answers.answer_date,
    answers.answerer_name,
    answers.question_helpfulness,
    (SELECT
      array_agg(
        json_build_object(
          'id', photos.photo_id,
          'url', photos.photo_url
        )
      ) as photos
      FROM photos
      WHERE answers.answer_id = photos.answer_id)
    FROM answers
    WHERE answers.question_id = ${id}
    AND answers.reported = 0;`;
  pool.query(sql)
    .then((results) => {
      result.results = results.rows;
      cb(result);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const postQuestionsAndAnswers = (body, name, email, id, cb) => {
  const sql = `
  INSERT INTO questions
    (product_id,
    question_body,
    question_date,
    asker_name,
    email)
  VALUES
    (${id}, '${body}', current_timestamp, '${name}', '${email}');`;
  pool.query(sql)
    .then((results) => {
      console.log(results);
      cb(results);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const postAnswers = (id, body, name, email, photos, cb) => {
  const sql = `
  INSERT INTO answers
    (question_id,
    body,
    answer_date,
    answerer_name,
    answerer_email)
  VALUES
    (${id}, '${body}', current_timestamp, '${name}', '${email}');
  INSERT INTO photos
    (answer_id, photo_url)
    VALUES
    (${id}, (unnest(string_to_array('${photos}',','))));`;
  pool.query(sql)
    .then((results) => {
      cb(results);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const putQuestionHelpful = (id, cb) => {
  const sql = `
  UPDATE questions
  SET question_helpfulness  = question_helpfulness  + 1
  WHERE question_id = ${id};`;
  pool.query(sql)
    .then((results) => {
      cb(results);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const putQuestionReport = (id, cb) => {
  const sql = `
  UPDATE questions
  SET reported = reported + 1
  WHERE question_id = ${id};`;
  pool.query(sql)
    .then((results) => {
      cb(results);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const putAnswerHelpful = (id, cb) => {
  const sql = `
  UPDATE answers
  SET question_helpfulness  = question_helpfulness  + 1
  WHERE answer_id = ${id};`;
  pool.query(sql)
    .then((results) => {
      cb(results);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const putAnswerReport = (id, cb) => {
  const sql = `
  UPDATE answers
  SET reported = reported + 1
  WHERE answer_id = ${id};`;
  pool.query(sql)
    .then((results) => {
      cb(results);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

module.exports = {
  getQuestionsAndAnswers,
  postQuestionsAndAnswers,
  getAnswers,
  postAnswers,
  putQuestionHelpful,
  putQuestionReport,
  putAnswerHelpful,
  putAnswerReport,
};

/*
login to psql => psql questions_answers

command to seed the database: cd into db => psql postgres <schema.sql

go into db => \c [db name]
quit postgres => \q
show schema for table => \d
return all columns from answers where id === 1 => SELECT * FROM answers where id in (1);

*/
