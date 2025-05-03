package models

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var Products = []Product{
	{ID: 1, Name: "Laptop", Price: 3499.99},
	{ID: 2, Name: "Mouse", Price: 99.99},
	{ID: 3, Name: "Keyboard", Price: 199.99},
	{ID: 4, Name: "Monitor", Price: 799.50},
}
