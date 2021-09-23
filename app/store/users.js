'use strict';

const { getConnection } = require('./connection');
const bcrypt = require('bcrypt');
const config = require('../conifg');

const addUser = async (login, password) => {
  const [[user]] = await getConnection().execute(
    'SELECT id FROM users WHERE login = ?',
    [login]
  );
  if (user) {
    throw new Error('This login already exists');
  }
  const hash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT);
  const [res] = await getConnection().execute(
    'INSERT INTO users SET login = ?, password = ?',
    [login, hash]
  );
  return {
    id: res.insertId,
    hash,
  };
};

const getUserByLogin = async (login) => {
  const [[user]] = await getConnection().execute(
    'SELECT * FROM users WHERE login = ?',
    [login]
  );
  return user;
};

module.exports = {
  addUser,
  getUserByLogin,
};
