let http = require('http');
let fs = require('fs');

PAGE = "placeholder";
function handleRequest(req,res)
{
    console.log("got request!");
    console.log(req.url);

    if(req.url == "/")PAGE = "placeholder";
    else PAGE = req.url.replace('/','');
    
    let content = fs.readFileSync("pages/"+PAGE+".html");
    res.write(content);
    res.end();
}

server = http.createServer(handleRequest);
server.listen(9000);
console.log("listening at http://127.0.0.1:9000")