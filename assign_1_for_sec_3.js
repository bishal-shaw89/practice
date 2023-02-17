const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url == '/') {
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>Hello welcome to my page</h1><form action="/create-user" method="POST"><input type="text" name="username"><input type="submit" value="submit"></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url == '/users') {
        res.write('<html>');
        res.write('<head></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url == '/create-user' && method === 'POST') {
        const msg = [];
        req.on('data', (chunk) => {
            msg.push(chunk);
        })
        req.on('end', () => {
            const bodyParser = Buffer.concat(msg).toString();
            const username = bodyParser.split('=')[1];
            console.log("username ->", username);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })
    }
})

server.listen(3000);