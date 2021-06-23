const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres'
});

client.connect()
.then(console.log('Connected to DB'))
.catch(console.log('Not connected to DB'));