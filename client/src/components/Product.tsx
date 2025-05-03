import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

interface Product {
    id: number;
    name: string;
    price: number;
}

const Products = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>("http://localhost:8080/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h2>Lista produktów</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} zł
                        <button onClick={() => addToCart(product.id)}>➕ Dodaj do koszyka</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
