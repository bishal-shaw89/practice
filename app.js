// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;
//     if (url === '/') {
//         res.write('<html>');
//         res.write('<head><title>My first page</title></head>');
//         res.write('<body><form action="/msg" method="POST"><input type="text" name="msg"><input type="submit" value="submit"></form></body>');
//         res.write('</html>');
//         return res.end();
//     }
//     if (url === '/msg' && method === 'POST') {
//         const data = [];
//         req.on('data', (chunk) => {
//             data.push(chunk);
//         })
//         req.on('end', () => {
//             const bodyParser = Buffer.concat(data).toString();
//             const msg = bodyParser.split('=')[1];
//             //fs.writeFileSync('message.txt', msg);
//             fs.writeFile('message.txt', msg, err => {
//                 res.statusCode = 302;
//                 res.setHeader('Location', '/');
//                 return res.end();
//             });
//         })
//     }
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My first page</title></head>');
//     res.write('<body><h1>Welcome to Node Js Server.</h1></body>');
//     res.write('</html>');
//     res.end();
// })

// server.listen(3000);

const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
//const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');

const pageNotFoundController = require("./controllers/404");

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/add-product', (req, res, next) => {
//     res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Submit</button>');
// })

// //app.use will work for both post and get method
// // app.use('/product', (req, res, next) => {
// //     console.log(JSON.parse(JSON.stringify(req.body)));
// //     res.redirect('/');
// // })

// // app.post will only work for post method. and for get we will use app.get
// app.post('/product', (req, res, next) => {
//     console.log(JSON.parse(JSON.stringify(req.body)));
//     res.redirect('/');
// })

// '/admin' is the filter for adminRoute, now only route with '/admin' will go inside adminRoute.
//app.use('/admin', adminData.routes);
app.use('/admin', adminRoute);

app.use(shopRoute);

// app.use((req, res, next) => {
//     //res.status(404).send('<h1>Page not found</h1>')
//     //res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
//     res.status(404).render('404', { pageTitle: 'Page Not Found' });
// })

app.use(pageNotFoundController.pageNotFound)

app.listen(3000);
