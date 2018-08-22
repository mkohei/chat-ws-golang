var myName = "NONAME";

var wsUri = "ws://localhost:8080/echo";
var websocket = null;

let data = {};
class App extends React.Component {
    constructor(props, context, updater) {
        super(props, context, updater)
        this.state = { list : [] }
        this.addToList = this.addToList.bind(this)
    }
    componentDidMount() {
        this.props.data.App = this;
    }
    componentWillUnmount() {
        delete this.props.data.App;
    }
    addToList(message) {
        this.state.list.unshift(message)
        this.setState({ list : this.state.list }) // re-lender
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map((message) => {
                        return <li>
                            <div>NAME : {message.name}</div>
                            <div>MESSAGE : {message.content}</div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}



function init() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
}

function onOpen(event) {
}

function onClose(event) {
}

function onMessage(evenet) {
    const d = event.data;
    const message = JSON.parse(d);
    console.log(message)
    console.log(data)
    data.App.addToList(message)
}

function onError(event) {
}


/**
 * 
 */

document.getElementById("connect-button").onclick = function() {
    init();
    const nametext = document.getElementById("name-text")
    var val = nametext.value;
    if (val == null || val.length == 0);
    else {
        myName = val;
    }
    nametext.value = myName;
    nametext.disabled = true;
    
    this.innerText = "Connected";
    this.disabled = true;
}

document.getElementById("send-button").onclick = function() {
    //console.log("button: ", websocket)

    if (websocket == null) return;
    var val = document.getElementById("input-text").value;
    if (val == null || val.length == 0);
    else {
        var json = JSON.stringify({
            name : myName,
            content : val
        });
        websocket.send(json);
    }
}


/**
 * 
 */


ReactDOM.render(
    <App data={data}/>,
    document.getElementById("board")
);

