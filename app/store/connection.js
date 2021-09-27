'use strict';

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let connection = null;

const init = async () => {
  connection = await mysql.createConnection({
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    user: MYSQL_USER,
    database: MYSQL_DATABASE,
  });
  console.log('CONNECTED TO MYSQL');

  await connection.execute(
    'CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, login VARCHAR(32), password VARCHAR(64), PRIMARY KEY(id), UNIQUE(login))'
  );
  await connection.execute(
    'CREATE TABLE IF NOT EXISTS items (id int AUTO_INCREMENT, `name` varchar(255), completed boolean, authorId int not null, foreign key (authorId) references users(id), PRIMARY KEY(id))'
  );
};

const close = async () => {};

const getConnection = () => connection;

module.exports = {
  init,
  close,
  getConnection,
};
