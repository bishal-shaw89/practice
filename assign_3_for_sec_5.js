const path = require('path');

const express = require('express');
const app = express();

const rootRoute = require('./routes/root');
const usersRoute = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRoute);

app.use(rootRoute);

app.listen(3001);