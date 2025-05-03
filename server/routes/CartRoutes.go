package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func RegisterCartRoutes(e *echo.Echo) {
	e.POST("/cart", controllers.AddProductToCart)
	e.GET("/cart", controllers.GetCart)

}
