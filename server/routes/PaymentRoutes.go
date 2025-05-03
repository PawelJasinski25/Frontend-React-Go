package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func RegisterPaymentRoutes(e *echo.Echo) {
	e.GET("/payments", controllers.GetPayment)
	e.POST("/payments", controllers.AddPayment)
}
