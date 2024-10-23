let http = require('http'),
    fs = require('fs');

const MAINPAGE = "index.html";
PAGE = MAINPAGE;

function handleRequest(req,res)
{
    console.log("got request!");
    console.log(req.url);

    if(req.url == "/")req.url = "/"+MAINPAGE;
    PAGE = req.url;
   
    let content = fs.readFileSync("pages"+PAGE);
    res.write(content);


    res.end();
}

server = http.createServer(handleRequest);
server.listen(9000);
console.log("listening at http://127.0.0.1:9000")