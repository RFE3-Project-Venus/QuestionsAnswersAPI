/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'ag',
  password: 'secret',
  database: 'questions_answers',
});

client.connect()
  .then(() => { console.log('Connected to DB'); })
  .catch((err) => { console.log('Not connected to DB', err); });

/*
login to psql => psql questions_answers

command to seed the database: cd into db => psql postgres <schema.sql

go into db => \c [db name]
quit postgres => \q
show schema for table => \d
return all columns from answers where id === 1 => SELECT * FROM answers where id in (1);

*/
