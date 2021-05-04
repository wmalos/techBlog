const express = require('express');
const session = require('express-session');
const routes = require('./controllers/index');
const helpers= require('./utils/helper');
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };