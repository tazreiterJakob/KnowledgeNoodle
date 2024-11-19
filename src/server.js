let http = require('http'),
    fs = require('fs');

const MAINPAGE = "index.html";
PAGE = MAINPAGE;
var data ="";

function handleRequest(req,res)
{
    console.log("got request!");
    console.log(req.url);

    if(req.url == "/")req.url = "/"+MAINPAGE;
    PAGE = req.url;


    if (req.method === 'POST') 
    {
        data="";
        message = "";
        req.on('data', async chunk => {
            data += chunk;
            console.log(data);
            message = await askopenai(data);
            console.log(message);
            res.write(message);
            res.end();
        });
    }else
    {
        if(PAGE.includes(".html")||PAGE.includes(".css"))
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

}

async function askopenai(message)
{
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+fs.readFileSync("key.txt")
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Das korrekte Modell für den Chat-Endpunkt
                messages: [{ role: "user", content: message }], // Verwenden Sie das 'messages'-Format für Chat-Modelle
                max_tokens: 50,
                temperature: 0.5,
            })
        });
 
        if (!response.ok) {
            const errorDetails = await response.json();
            console.log("Fehlerdetails:", errorDetails);
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
 
        const data = await response.json();
        if (!data.choices || !data.choices[0]) {
            console.log("Unerwartete Antwortstruktur:", data);
            throw new Error("Die Antwort enthält keine 'choices'-Daten.");
        }
 
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Fehler:", error.message);
        return "Es gab ein Problem mit der Anfrage.";
    }
}

server = http.createServer(handleRequest);
server.listen(9000);
console.log("listening at http://127.0.0.1:9000")