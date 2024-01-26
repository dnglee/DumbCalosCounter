package dataRepository

import (
	"DumbCalos/internal/app/models"
	"database/sql"
)

// var allFoods = []models.Food{
// 	{
// 		Name:     "Apple",
// 		Calories: 100,
// 		Protein:  20,
// 		Carbs:    30,
// 		Fats:     40,
// 	},
// 	{
// 		Name:     "Banana",
// 		Calories: 200,
// 		Protein:  30,
// 		Carbs:    40,
// 		Fats:     50,
// 	},
// 	{
// 		Name:     "Orange",
// 		Calories: 300,
// 		Protein:  40,
// 		Carbs:    50,
// 		Fats:     60,
// 	},
// }

var db *sql.DB

func InitiatlizeDB(inDB *sql.DB) {
	db = inDB
}

func GetFoods() ([]models.Food, error) {

	rows, err := db.Query("SELECT Name, Calories, Protein, Carbs, Fats FROM dbo.tbl_foods")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var qFoods []models.Food

	for rows.Next() {
		var qFood models.Food

		err := rows.Scan(&qFood.Name, &qFood.Calories, &qFood.Protein, &qFood.Carbs, &qFood.Fats)

		if err != nil {
			return nil, err
		}

		qFoods = append(qFoods, qFood)
	}

	return qFoods, nil
}

func AddFoods(newFood models.Food) error {

	_, err := db.Exec("INSERT INTO dbo.tbl_foods(Name, Calories, Protein, Carbs, Fats) VALUES($1, $2, $3, $4, $5)", newFood.Name, newFood.Calories, newFood.Protein, newFood.Carbs, newFood.Fats)

	if err != nil {
		return err
	}

	return nil
}
