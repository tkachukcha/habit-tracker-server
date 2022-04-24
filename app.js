const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const cors = require('cors');
const config = require('config');
// const initDatabase = require('./startup/initDatabase');
const routes = require('./routes');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

const PORT = config.get('port') ?? 39567;

async function start() {
  try {
    // mongoose.connection.once('open', () => {
    //   initDatabase();
    // });
    await mongoose.connect(`${process.env.MONGO_URI}${config.get('mongoUri')}`);
    console.log(chalk.blueBright('Connected to mongoDB'));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is listening on port ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
