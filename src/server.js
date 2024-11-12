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


    if (req.method === 'POST') 
    {
        data="";
        req.on('data', chunk => {
            console.log(chunk);
            data += chunk;
            console.log(data);
            res.end(data);
        });
    }else if(PAGE.includes(".html")||PAGE.includes(".css"))
    {
        content = fs.readFileSync("pages"+PAGE);
    }else if(PAGE.includes(".js")||PAGE.includes(".txt"))
    {
        content = fs.readFileSync("code"+PAGE);
    }else{
        content = fs.readFileSync("media"+PAGE);
    }


    res.write(content);


    res.end();
}

server = http.createServer(handleRequest);
server.listen(9000);
console.log("listening at http://127.0.0.1:9000")