const INCORRECT_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const { JWT_SECRET, NODE_ENV, DB_URL } = process.env;
const DEV_SECRET = 'dev-secret';

const HIDDEN_KEY = NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET;
const DB = NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = 3000;

module.exports = {
  INCORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  HIDDEN_KEY,
  DB,
  PORT,
};
