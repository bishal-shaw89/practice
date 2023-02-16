const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Submit</button>');
})

//app.use will work for both post and get method
// app.use('/product', (req, res, next) => {
//     console.log(JSON.parse(JSON.stringify(req.body)));
//     res.redirect('/');
// })

// app.post will only work for post method. and for get we will use app.get
app.post('/product', (req, res, next) => {
    console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!!</h1>');
})

app.listen(3000);