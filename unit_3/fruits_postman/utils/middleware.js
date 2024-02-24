require('dotenv').config();
require('../config/connection.js');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const middleware = (app) => {
  app.use(morgan('dev')); // logging
  app.use(express.json()); 
  app.use(express.static('public'));

  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      saveUninitialized: true,
      resave: false
    })
  )
}

module.exports = middleware;