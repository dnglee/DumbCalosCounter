package dataRepository

import (
	"DumbCalos/internal/app/models"
	"database/sql"
	"fmt"
)

var db *sql.DB

func InitiatlizeDB(inDB *sql.DB) {
	db = inDB
}

func GetFoods() ([]models.Food, error) {

	rows, err := db.Query("SELECT Fd_id, Name, Calories, Protein, Carbs, Fats, date_food_added FROM dbo.tbl_foods")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var qFoods []models.Food

	for rows.Next() {
		var qFood models.Food

		err := rows.Scan(&qFood.Fd_id, &qFood.Name, &qFood.Calories, &qFood.Protein, &qFood.Carbs, &qFood.Fats, &qFood.Date_Food_Added)

		if err != nil {
			return nil, err
		}

		qFoods = append(qFoods, qFood)
	}

	return qFoods, nil
}

func GetFoodsByDate(selected_date string) ([]models.Food, error) {

	// year, month, day := selected_date.Date()

	sql := "SELECT Name, Calories, Protein, Carbs, Fats, date_food_added FROM dbo.tbl_foods WHERE date_food_added::date = " + "'" + selected_date + "'"
	fmt.Println(sql)
	rows, err := db.Query(sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var qFoods []models.Food

	for rows.Next() {
		var qFood models.Food

		err := rows.Scan(&qFood.Name, &qFood.Calories, &qFood.Protein, &qFood.Carbs, &qFood.Fats, &qFood.Date_Food_Added)

		if err != nil {
			return nil, err
		}

		qFoods = append(qFoods, qFood)
	}

	return qFoods, nil
}

func AddFoods(newFood models.Food) error {

	_, err := db.Exec("INSERT INTO dbo.tbl_foods(Name, Calories, Protein, Carbs, Fats, date_food_added) VALUES($1, $2, $3, $4, $5, $6)", newFood.Name, newFood.Calories, newFood.Protein, newFood.Carbs, newFood.Fats, newFood.Date_Food_Added)

	if err != nil {
		return err
	}

	return nil
}
