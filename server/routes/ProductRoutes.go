package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func RegisterProductRoutes(e *echo.Echo) {
	e.GET("/products", controllers.GetProducts)
}
