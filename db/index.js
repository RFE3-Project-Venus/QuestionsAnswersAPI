/* eslint-disable no-console */
const { Pool } = require('pg');
const { USER, PASSWORD, DB } = require('../pass.js');

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  database: DB,
  // host: 'db',
});

pool.connect()
  .then(() => { console.log('Connected to DB'); })
  .catch((err) => { console.log('Not connected to DB', err); });

const getQuestionsAndAnswers = (id, cb) => {
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
        (answers.id,
        json_build_object(
        'id', answers.id,
        'body', answers.body,
        'date', answers.answer_date,
        'answerer_name', answers.answerer_name,
        'helpfulness', answers.question_helpfulness,
        'photos', (SELECT
          array_agg(photos.photo_url) as photos
          FROM photos
          WHERE answers.id = photos.answer_id)
        )
      )
      FROM answers
      WHERE questions.question_id = answers.question_id
      AND answers.reported = 0
     ) AS answers
    FROM questions
    WHERE questions.product_id = ${id}
    AND questions.reported = 0;`;
  pool.query(sql)
    .then((questions) => {
      result.results = questions.rows;
      cb(result);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const getAnswers = (cb) => {
  pool.query('SELECT * FROM answers LIMIT 5;')
    .then((results) => {
      console.log(results.rows);
      cb(results.rows);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const postQuestionsAndAnswers = (cb) => {
  pool.query('SELECT * FROM answers LIMIT 5;')
    .then((results) => {
      console.log(results.rows);
      cb(results.rows);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const postAnswers = (cb) => {
  pool.query('SELECT * FROM answers LIMIT 5;')
    .then((results) => {
      console.log(results.rows);
      cb(results.rows);
    })
    .catch((e) => console.log('Query Error:', e.stack));
};

const putQuestionHelpful = (cb) => {

};

const putQuestionReport = (cb) => {

};

const putAnswerHelpful = (cb) => {

};

const putAnswerReport = (cb) => {

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
