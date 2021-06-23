const {Client} = require('pg');

const client = new Client({
  user: 'ag',
  password: '',
  database: 'questions_answers',
});

client.connect()
.then(() => {console.log('Connected to DB')})
.catch((err) => {console.log('Not connected to DB', err)});

/*
command to seed the database: cd into db => psql postgres <schema.sql

go into db => \c [db name]
quit postgres => \q
show schema for table => \d

*/

