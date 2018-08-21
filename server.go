package main

import (
	"fmt"
	"net/http"

	"golang.org/x/net/websocket"
)

type Data struct {
	Content string
}

var ws_array []*websocket.Conn // *websocket.Connを入れる配列

func echoHandler(ws *websocket.Conn) {
	ws_array = append(ws_array, ws)

	var d Data
	websocket.JSON.Receive(ws, &d)

	for _, con := range ws_array {
		fmt.Println("value:", con)
		websocket.JSON.Send(con, d)
	}

	fmt.Printf("%#v\n", d)
	//io.Copy(ws, ws)
}

func main() {
	http.Handle("/echo", websocket.Handler(echoHandler))
	http.Handle("/", http.FileServer(http.Dir("./")))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}
