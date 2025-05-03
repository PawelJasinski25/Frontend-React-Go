import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

interface Payment {
    name: string;
    surname: string;
    credit_card_number: string;
    amount: number;
}

const Payment = () => {
    const { fetchCart } = useCart();

    const [payment, setPayment] = useState<Payment>({
        name: "",
        surname: "",
        credit_card_number: "",
        amount: 0,
    });

    const fetchCartItems = async () => {
        try {
            const response = await axios.get<{ items: { product_id: number; quantity: number }[] }>("http://localhost:8080/cart");
            return response.data.items;
        } catch (error) {
            console.error("Błąd pobierania koszyka:", error);
            return [];
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get<{ id: number; price: number }[]>("http://localhost:8080/products");
            return response.data;
        } catch (error) {
            console.error("Błąd pobierania produktów:", error);
            return [];
        }
    };

    const calculateTotalAmount = (cartItems: { product_id: number; quantity: number }[], products: { id: number; price: number }[]) => {
        return cartItems.reduce((sum, item) => {
            const product = products.find(p => p.id === item.product_id);
            return sum + (product?.price ?? 0) * item.quantity;
        }, 0);
    };

    useEffect(() => {
        const loadData = async () => {
            const cartItems = await fetchCartItems();
            const products = await fetchProducts();
            const totalAmount = calculateTotalAmount(cartItems, products);
            setPayment(prev => ({ ...prev, amount: totalAmount }));
        };

        loadData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("📡 Sending payment data:", payment);

        try {
            await axios.post("http://localhost:8080/payments", payment, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Płatność przetworzona!");

            fetchCart();

            setPayment({ name: "", surname: "", credit_card_number: "", amount: 0 });
        } catch (error) {
            console.error("Błąd płatności:", error);
        }
    };

    return (
        <div>
            <h2>Formularz płatności</h2>
            <h3>Całkowita wartość płatności: {payment.amount.toFixed(2)} zł</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Imię"
                    onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    onChange={(e) => setPayment({ ...payment, surname: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Numer karty"
                    onChange={(e) => setPayment({ ...payment, credit_card_number: e.target.value })}
                />
                <button type="submit">Zapłać</button>
            </form>
        </div>
    );
};

export default Payment;
