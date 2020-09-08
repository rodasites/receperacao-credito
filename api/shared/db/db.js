var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'mysql669.umbler.com',
    port: '41890',
    user : 'testedbserver',
    password : 'rodasites2020',
    database : 'testedbserver'
  }
});

exports.connect = function () {
  return knex;
}