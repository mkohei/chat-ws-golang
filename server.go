package main

import (
	"fmt"
	"net/http"

	"golang.org/x/net/websocket"
)

type Data struct {
	Content string
}

var (
	ws_array []*websocket.Conn // *websocket.Connを入れる配列
	conns    = map[*websocket.Conn]bool{}
)

func echoHandler(ws *websocket.Conn) {
	/*
		ws_array = append(ws_array, ws)
		conns[ws] = true

		var d Data
		websocket.JSON.Receive(ws, &d)

		for _, con := range ws_array {
			fmt.Println("value:", con)
			websocket.JSON.Send(con, d)
		}

		fmt.Printf("****\n%#v\n", d)
		fmt.Printf("****\n%#v\n", ws_array)
		//fmt.Printf("****\n%#v\n", conns)
		//io.Copy(ws, ws)
	*/
	ws_array = append(ws_array, ws)
	//conns[ws] = true

	var err error
	for {
		var content string

		if err = websocket.Message.Receive(ws, &content); err != nil {
			fmt.Println("Cant receive")
			break
		}

		fmt.Println("Received back from client: " + content)

		msg := "Received: " + content
		fmt.Println("Sensing to client: " + msg)

		for _, con := range ws_array {
			fmt.Println("value:", con)
			websocket.Message.Send(con, content)
		}
		/*
			if err = websocket.Message.Send(ws, msg); err != nil {
				fmt.Println("Cant send")
				break
			}
		*/
	}
}

func main() {
	http.Handle("/echo", websocket.Handler(echoHandler))
	http.Handle("/", http.FileServer(http.Dir("./")))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}
