FROM golang

ADD . /go/src/
EXPOSE 8080
CMD ["/usr/local/go/bin/go", "run", "/go/src/server.go"]