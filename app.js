const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
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
