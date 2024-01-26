package handlers

import (
	dataRepository "DumbCalos/internal/app/data"
	"DumbCalos/internal/app/models"
	"encoding/json"
	"net/http"
)

func GetFoods(w http.ResponseWriter, r *http.Request) {

	getAllFoods, err := dataRepository.GetFoods()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(getAllFoods)
}

func AddFoods(w http.ResponseWriter, r *http.Request) {
	var newFood models.Food

	err := json.NewDecoder(r.Body).Decode(&newFood)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	dataRepository.AddFoods(newFood)

	w.WriteHeader(http.StatusCreated)

}
