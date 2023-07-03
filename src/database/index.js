const { Client } = require('pg');

const client = new Client({
  host: 'pg_container',
  port: 5432,
  user: 'root',
  password: '1234',
  database: 'bancogazin',
  rejectUnauthorized: false,
});
client.connect();

exports.query = async (query, value) => {
  const result = await client.query(query, value);
  return result.rows;
};
