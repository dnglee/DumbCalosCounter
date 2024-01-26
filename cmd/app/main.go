package main

import (
	dataRepository "DumbCalos/internal/app/data"
	handlers "DumbCalos/internal/app/http"
	"database/sql"
	"log"
	"net/http"
	"os"

	//open-source references
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {

	errEnv := godotenv.Load("config.env")

	if errEnv != nil {
		log.Fatal(errEnv)
	}

	connString := os.Getenv("PS_DB_ConnString")

	var errDB error
	db, errDB = sql.Open("postgres", connString)
	if errDB != nil {
		log.Fatal(errDB)
	}

	dataRepository.InitiatlizeDB(db)

	router := mux.NewRouter()
	router.Use(SetJSONContentTypeMiddleware)
	router.HandleFunc("/api/foods/", handlers.GetFoods).Methods("GET")
	router.HandleFunc("/api/addFodds/", handlers.AddFoods).Methods("POST")

	http.ListenAndServe(":8080", router)
}

func SetJSONContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set Content-Type to application/json
		w.Header().Set("Content-Type", "application/json")
		// Call the next handler in the chain
		next.ServeHTTP(w, r)
	})
}
