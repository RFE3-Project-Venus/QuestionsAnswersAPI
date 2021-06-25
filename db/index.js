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

const test = (cb) => {
  console.log('i am being hit');
  pool.query('SELECT * FROM questions LIMIT 3;')
    .then((grr) => {
      console.log(grr.rows);
      cb(grr);
    })
    .catch((e) => console.log('was it this one?', e.stack));
};

module.exports = {
  test,
};
/*
login to psql => psql questions_answers

command to seed the database: cd into db => psql postgres <schema.sql

go into db => \c [db name]
quit postgres => \q
show schema for table => \d
return all columns from answers where id === 1 => SELECT * FROM answers where id in (1);

*/
