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

    useEffect(() => {
        axios.get<{ items: { product_id: number; quantity: number }[] }>("http://localhost:8080/cart")
            .then(response => {
                axios.get<{ id: number; price: number }[]>("http://localhost:8080/products")
                    .then(productsResponse => {
                        const total = response.data.items.reduce((sum, item) => {
                            const product = productsResponse.data.find(p => p.id === item.product_id);
                            return sum + (product?.price || 0) * item.quantity;
                        }, 0);
                        setPayment(prev => ({ ...prev, amount: total }));
                    });
            })
            .catch(error => console.error("Błąd pobierania wartości koszyka:", error));
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
                <input type="text" placeholder="Imię"
                       onChange={(e) => setPayment({ ...payment, name: e.target.value })} />
                <input type="text" placeholder="Nazwisko"
                       onChange={(e) => setPayment({ ...payment, surname: e.target.value })} />
                <input type="text" placeholder="Numer karty"
                       onChange={(e) => setPayment({ ...payment, credit_card_number: e.target.value })} />
                <button type="submit">Zapłać</button>
            </form>
        </div>
    );
};

export default Payment;
