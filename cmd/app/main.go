package main

import (
	handlers "DumbCalos/internal/app/http/handlers"
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
	httpClient := &http.Client{}
	if errEnv != nil {
		log.Fatal(errEnv)
	}

	connString := os.Getenv("PS_DB_ConnString")

	var errDB error
	db, errDB = sql.Open("postgres", connString)
	if errDB != nil {
		log.Fatal(errDB)
	}

	foodHandler := handlers.FoodHandler{
		DB:         db,
		HttpClient: httpClient,
	}

	// dataRepository.InitiatlizeDB(db)

	router := mux.NewRouter()
	router.Use(SetJSONContentTypeMiddleware)
	foodHandler.RegisterRouter(router)
	// router.HandleFunc("/api/foods/", handlers.GetFoods).Methods("GET")
	// router.HandleFunc("/api/addFodds/", handlers.AddFoods).Methods("POST")
	// router.HandleFunc("/api/getFoodsByDate/", handlers.GetFoodsByDate).Methods("GET")

	http.ListenAndServe(":8080", router)
}

func SetJSONContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set Content-Type to application/json
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler in the chain
		next.ServeHTTP(w, r)
	})
}
