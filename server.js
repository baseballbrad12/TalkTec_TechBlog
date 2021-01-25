const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

// Express-Session Import
const session = require('express-session');
const exphandlebars = require('express-handlebars');

const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 5000;

// Session Set Up
const SetSession = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
};

app.use(session(SetSession));

const handbars = exphandlebars.create({ helpers });

app.engine('handlebars', handbars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log('Now listening'));
});