package foodsInterface

import (
	"DumbCalos/internal/app/models"
)

type IFoods interface {
	GetFoods() []models.Food
	AddFoods(foods []models.Food)
}
