xhr = new XMLHttpRequest();
function submit()
{
    var text = document.getElementById('messageInput').value;
    
    xhr.open('POST', 'http://127.0.0.1:9000', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Antwort vom Server:', xhr.responseText);
        } else {
            console.error('Fehler beim Senden der Daten:', xhr.statusText);
        }
    };
    xhr.send('text=' + encodeURIComponent(text));

    console.log(text);
}