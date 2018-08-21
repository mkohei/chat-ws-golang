var wsUri = "ws://localhost:8080/echo";
var websocket = null;

function init() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
}

function onOpen(event) {
    console.log(event);
    console.log("Connected");
}

function onClose(event) {
    console.log(event);
}

function onMessage(evenet) {
    const data = event.data;
    console.log(data);
}

function onError(event) {
    console.log(event);
}


/**
 * 
 */

document.getElementById("connect-button").onclick = function() {
    init();
    this.innerText = "Connected";
    this.disabled = true;
}

document.getElementById("send-button").onclick = function() {
    if (websocket == null) return;
    var val = document.getElementById("input-text").value;
    if (val == null || val.length == 0);
    else {
        var json = JSON.stringify({
            content : val
        });
        websocket.send(json);
    }
}


/**
 * 
 */

class Foo extends React.Component {
    render() {
        return <div>AAAA</div>;
    }
}

ReactDOM.render(
    <Foo />,
    document.getElementById("board")
);