package models

type Payment struct {
	Name             string  `json:"name"`
	Surname          string  `json:"surname"`
	CreditCardNumber string  `json:"credit_card_number"`
	Amount           float64 `json:"amount"`
}
