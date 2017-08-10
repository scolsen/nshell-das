/**
 * Created by scolsen on 3/6/17.
 * Server for docsys functionality.
 */
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const nshell = require('./nshell');

function setHeader(uri){
    if(uri.match(/.*.css/)){
        return 'text/css'
    } else if (uri.match(/.*.html/)){
        return 'text/html'
    } else if (uri.match(/.*.txt/)){
        console.log('txt requested');
        return 'text/plain'
    }
}

function parseQuery(request){
    return url.parse(request.url, true).query;
}

function handleQuery(q){
    console.log(q);
    if(Object.prototype.hasOwnProperty.call(q, "command")){
        let args = q.command.split(' ');
        console.log(args);
        nshell.processInputUI.apply(this, args);
    }
}
const server = http.createServer((req, res)=>{
    let uri =  path.join(process.cwd(), url.parse(req.url).pathname);
    if(req.method == "GET"){
        fs.readFile(uri, (err, data)=>{
            if(err){
                res.writeHead(404, {'Content-Type':'text/html'});
                res.end('404 File not found.');
            }
            res.writeHead(200, {'Content-Type':setHeader(uri)});
            res.write(data, function(err){
                res.end();
            });
        });
    } else if (req.method == "POST"){
        let requestBody = "";
        req.on('data', function(data){
            requestBody += data;
        });
        req.on('end', function(){
            fs.writeFileSync(uri, requestBody);
        });
    }
});

server.on('request', (req, res)=>{
    handleQuery(parseQuery(req));
});

server.listen(8000, 'localhost');
