package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"server/routes"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	routes.RegisterProductRoutes(e)
	routes.RegisterCartRoutes(e)
	routes.RegisterPaymentRoutes(e)

	e.Start(":8080")
}
