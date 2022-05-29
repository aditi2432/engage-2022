package main

import (
	"log"
	"net/http"

	server "backend/routes"
)

func main() {

	router := server.NewRouter()

	log.Println("Starting server on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))

}
