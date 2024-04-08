package models

import (
	"database/sql"
	"time"
)

type Food struct {
	Fd_id           int       `json:"fd_id"`
	Name            string    `json:"name"`
	Calories        int       `json:"calories"`
	Protein         int       `json:"protein"`
	Carbs           int       `json:"carbs"`
	Fats            int       `json:"fats"`
	Date_Food_Added time.Time `json:"date_food_added"`
}

type FoodInterface interface {
	InitiatlizeDB(inDB *sql.DB)
	GetFoods() ([]*Food, error)
	GetFoodsByDate(selected_date string) ([]*Food, error)
	AddFoods(foods *Food) error
}

// type UserRepository interface {
// 	CreateUser(user *User) error
// 	GetUserByID(id string) (*User, error)
// 	UpdateUser(user *User) error
// 	DeleteUser(id string) error
// }
