/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ag',
  password: 'secret',
  database: 'questions_answers',
  host: 'db',
});

pool.connect()
  .then(() => { console.log('Connected to DB'); })
  .catch((err) => { console.log('Not connected to DB', err); });

const getQuestionsAndAnswers = (cb) => {
  console.log('i am being hit');
  pool.query('SELECT * FROM questions LIMIT 3;')
    .then((grr) => {
      console.log(grr.rows);
      cb(grr.rows);
    })
    .catch((e) => console.log('was it this one?', e.stack));
};

const getAnswers = (cb) => {
  pool.query('SELECT * FROM answers LIMIT 5;')
    .then((grr) => {
      console.log(grr.rows);
      cb(grr.rows);
    })
    .catch((e) => console.log('was it this one?', e.stack));
};

const postQuestionsAndAnswers = (cb) => {
  pool.query('SELECT * FROM answers LIMIT 5;')
    .then((grr) => {
      console.log(grr.rows);
      cb(grr.rows);
    })
    .catch((e) => console.log('was it this one?', e.stack));
};

const postAnswers = (cb) => {
  pool.query('SELECT * FROM answers LIMIT 5;')
    .then((grr) => {
      console.log(grr.rows);
      cb(grr.rows);
    })
    .catch((e) => console.log('was it this one?', e.stack));
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
