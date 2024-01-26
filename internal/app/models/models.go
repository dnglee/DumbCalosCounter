package models

type Food struct {
	Name     string `json:"name"`
	Calories int    `json:"calories"`
	Protein  int    `json:"protein"`
	Carbs    int    `json:"carbs"`
	Fats     int    `json:"fats"`
}
