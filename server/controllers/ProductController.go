package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
)

func GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, models.Products)
}
