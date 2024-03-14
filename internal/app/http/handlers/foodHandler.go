package handlers

import (
	dataRepository "DumbCalos/internal/app/data"
	"DumbCalos/internal/app/models"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type FoodHandler struct {
	DB         *sql.DB
	HttpClient *http.Client
}

// type IFoods struct {
// 	IFoodRepo models.FoodInterface
// }

func (fc *FoodHandler) RegisterRouter(r *mux.Router) {
	r.HandleFunc("/api/foods/", fc.GetFoods()).Methods("GET")
	r.HandleFunc("/api/addFodds/", fc.AddFoods()).Methods("POST")
	r.HandleFunc("/api/getFoodsByDate/", fc.GetFoodsByDate()).Methods("GET")
}

// Type structs
type Selected_date struct {
	Selected_Date string `json:"selected_date"`
}

func (fc *FoodHandler) GetFoods() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		dataRepository.InitiatlizeDB(fc.DB)
		getAllFoods, err := dataRepository.GetFoods()

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(getAllFoods)
	}
}

func (fc *FoodHandler) GetFoodsByDate() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var selected_date Selected_date

		err := json.NewDecoder(r.Body).Decode(&selected_date)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Println("dateSelected: " + selected_date.Selected_Date)
		dataRepository.InitiatlizeDB(fc.DB)
		getAllFoods, err := dataRepository.GetFoodsByDate(selected_date.Selected_Date)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(getAllFoods)
	}
}

func (fc *FoodHandler) AddFoods() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var newFood models.Food

		err := json.NewDecoder(r.Body).Decode(&newFood)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		dataRepository.InitiatlizeDB(fc.DB)
		dataRepository.AddFoods(newFood)

		w.WriteHeader(http.StatusCreated)

	}
}
