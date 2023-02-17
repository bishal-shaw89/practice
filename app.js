const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><form action="/msg" method="POST"><input type="text" name="msg"><input type="submit" value="submit"></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/msg' && method === 'POST') {
        const data = [];
        req.on('data', (chunk) => {
            data.push(chunk);
        })
        req.on('end', () => {
            const bodyParser = Buffer.concat(data).toString();
            const msg = bodyParser.split('=')[1];
            //fs.writeFileSync('message.txt', msg);
            fs.writeFile('message.txt', msg, err =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Welcome to Node Js Server.</h1></body>');
    res.write('</html>');
    res.end();
})

server.listen(3000);