import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
}

const Cart = () => {
    const { cart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>("http://localhost:8080/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const groupedCart = (cart ?? []).reduce((acc, item) => {
        const existingItem = acc.find(i => i.product_id === item.product_id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, [] as { product_id: number; quantity: number }[]);


    const calculateTotalPrice = () => {
        return groupedCart.reduce((total, item) => {
            const product = products.find(p => p.id === item.product_id);
            return total + (product?.price || 0) * item.quantity;
        }, 0);
    };

    return (
        <div>
            <h2>Twój koszyk</h2>
            {groupedCart.length ? (
                <>
                    <ul>
                        {groupedCart.map((item) => {
                            const product = products.find(p => p.id === item.product_id);
                            const totalPrice = (product?.price || 0) * item.quantity;

                            return (
                                <li key={item.product_id}>
                                    {product?.name} - Ilość: {item.quantity} - {totalPrice.toFixed(2)} zł
                                </li>
                            );
                        })}
                    </ul>
                    <h3>Całkowita wartość koszyka: {calculateTotalPrice().toFixed(2)} zł</h3>
                </>
            ) : (
                <p>Koszyk jest pusty! Dodaj produkty do koszyka.</p>
            )}
        </div>
    );
};

export default Cart;
