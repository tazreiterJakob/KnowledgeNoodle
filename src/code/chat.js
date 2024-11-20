xhr = new XMLHttpRequest();

var verlauf =[];
verlauf.push({ role: "system",content: "Du heist KnowledgeNoodle, du sollst den user Fragen mit vier Antwortmöglichkeiten über ein angegebenes Thema fragen, wenn du kein Thema bekommst sollst du erlautern das du ein Thema brauchst"});

function submit()
{
    var text = document.getElementById('messageInput').value;
    document.getElementById('messageInput').value ="";
    if(text.replace(/ /g,'') == "") return;
    createMessage("user",text);
    verlauf.push({role:"user",content:text});
    
    xhr.open('POST', window.location.origin, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            createMessage("KnowledgeNoodle",xhr.responseText);
            console.log('Antwort vom Server:', xhr.responseText);
            verlauf.push({role:"assistant",content:xhr.responseText});
        } else {
            createMessage( "KnowledgeNoodle","Fehler beim Senden der Daten"+xhr.statusText);
            console.error('Fehler beim Senden der Daten:', xhr.statusText);
        }
    };
    xhr.send(JSON.stringify(verlauf));

    console.log(JSON.stringify(verlauf));
}

function getAllMessages()
{
    document.getElementById('chat-log').innerHTML="";
    cheese =[localStorage.length];
    for (var i = 0; i < localStorage.length; i++)
    {
        text = localStorage.key(i).split("|");
        cheese[text[0]] = localStorage.key(i);
    }
    for (var i = 0; i < cheese.length; i++)
    {
        if(cheese.length > 1){
            console.log(cheese[i]);
            text ="";
            text += cheese[i];
            text= text.split("|")[1];
            if(text == "KnowledgeNoodle")
            {
                verlauf.push({role:"assistent",content:localStorage.getItem(cheese[i])});
            }else{
                verlauf.push({role:"user",content:localStorage.getItem(cheese[i])});
            }
            appendMessage(text,localStorage.getItem(cheese[i]));
        }

    }
}

function clearLocalStorage()
{
    localStorage.clear();
    verlauf = [];
    verlauf.push({ role: "system",content: "Du heist KnowledgeNoodle, du sollst den user Fragen mit vier Antwortmöglichkeiten über ein angegebenes Thema fragen, wenn du kein Thema bekommst sollst du erlautern das du ein Thema brauchst"});

    getAllMessages();
}

function appendMessage(teilnehmer,text)
{
    var chatLog = document.getElementById('chat-log');
    if(teilnehmer == "KnowledgeNoodle")
    {
        chatLog.innerHTML += "<div class=\"aiMessage\">"+text+"</div>";
    }else
    {
        chatLog.innerHTML += "<div class=\"userMessage\">"+text+"</div>";
    }
    var objDiv = document.getElementById("chat-log");
    objDiv.scrollTop = objDiv.scrollHeight;
    document.getElementById("messageInput").value = "";
}

function createMessage(teilnehmer,text)
{
    let date = new Date(); 
    localStorage.setItem(localStorage.length+"|"+teilnehmer,text);
    appendMessage(teilnehmer,text);

}

function HandleKeyPress(event){
    if(event.keyCode == 13){
        submit();
    }
}