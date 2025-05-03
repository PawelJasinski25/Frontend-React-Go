package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
)

var currentCart models.Cart

func AddProductToCart(c echo.Context) error {
	var item models.CartItem
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	found := false
	for i, existing := range currentCart.Items {
		if existing.ProductID == item.ProductID {
			currentCart.Items[i].Quantity += item.Quantity
			found = true
			break
		}
	}

	if !found {
		currentCart.Items = append(currentCart.Items, item)
	}

	return c.JSON(http.StatusCreated, currentCart)
}

func GetCart(c echo.Context) error {
	return c.JSON(http.StatusOK, currentCart)
}

func calculateCartTotal(cart models.Cart) float64 {
	total := 0.0
	for _, item := range cart.Items {
		for _, product := range models.Products {
			if product.ID == item.ProductID {
				total += product.Price * float64(item.Quantity)
				break
			}
		}
	}
	return total
}
