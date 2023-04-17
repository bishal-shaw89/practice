const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const feedRoutes = require('./routes/feed');

//app.use(bodyParser.urlencoded()); // this is used for the data formats that request from x-www-form-urlencoded
app.use(bodyParser.json()); // this is good for application/json 

// need to set the headers before calling routes, so that it will be available for every request.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // can specify different origins with comma(',') sperate insted of '*'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // can give '*' to allow all http methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // can give '*' to allow all headers.
    next();
});

app.use('/feed', feedRoutes);

app.listen(8080);