import { Routes, Route, NavLink } from "react-router-dom";
import Products from "./components/Product";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";
import "./App.css";

const App = () => {
    return (
        <CartProvider>
            <div>
                <nav className="navbar">
                    <NavLink to="/" className="nav-link"> Strona główna</NavLink>
                    <NavLink to="/products" className="nav-link"> Produkty</NavLink>
                    <NavLink to="/cart" className="nav-link"> Koszyk</NavLink>
                    <NavLink to="/payment" className="nav-link"> Płatności</NavLink>
                </nav>

                <Routes>
                    <Route path="/" element={<h1>Witaj w sklepie</h1>} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </div>
        </CartProvider>
    );
};

export default App;
