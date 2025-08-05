import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ProductDetails } from "./components/ProductDetails";
import { Cart } from "./components/Cart";
import { NotFound } from "./components/NotFound";
import { CartProvider } from "./context/cartReducer.tsx";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <div
                    css={{
                        minHeight: "100vh",
                        background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundAttachment: "fixed",
                    }}
                >
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/product/:id"
                                element={<ProductDetails />}
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
