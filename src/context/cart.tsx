import { createContext } from "react";
import type { Product } from "../components/types.ts";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    subTotal: number;
};

export type CartState = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
};

export type CartContextType = {
    state: CartState;
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
