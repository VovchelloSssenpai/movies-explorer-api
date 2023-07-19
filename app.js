const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.xssFilter());
app.use(cors({ credentials: true }));

app.use(router);

app.use(limiter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
