var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, res) {
    switch(req.url) {
        case '/':
            sendFile('./index.html', res);
            break;
        case '/subscribe':
            chat.subscribe(req, res);
            break;
        case '/publish':
            var body = '';
            req.on('readable', function() {
                body += req.read();
                console.log('req read', JSON.stringify(req.read()))
            }).on('end', function(){
                try {
                    console.log('try body', JSON.stringify(body));
                    body = JSON.parse(body);
                }
                catch(error) {
                    res.statusCode = 400;
                    res.end('Bad request');
                    return;
                }
                chat.publish(body.message);
                res.end('ok');
            });
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
}).listen(8080);
//
var sendFile = function(fileName, res) {
    fs.readFile(fileName, 'utf-8' , function (err, data) {
        if(err) {
            throw  err;
        }
        else {
            res.end(data);
        }
    });
};
//sendFile('index.html');