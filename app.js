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
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is listening on port ${PORT}...`));
    });
  } catch (error) {}
}

start();
