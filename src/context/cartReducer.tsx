import type { ReactNode } from "react";
import { useReducer } from "react";
import type { Product } from "../components/types";
import {
    CartContext,
    type CartContextType,
    type CartItem,
    type CartState,
} from "./cart.tsx";

type CartAction =
    | { type: "ADD_ITEM"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                              subTotal: (item.quantity + 1) * item.price,
                          }
                        : item
                );

                return {
                    ...state,
                    items: updatedItems,
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price,
                };
            }

            const newItem: CartItem = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                quantity: 1,
                subTotal: action.payload.price,
            };

            return {
                ...state,
                items: [...state.items, newItem],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + action.payload.price,
            };
        }

        case "REMOVE_ITEM": {
            const itemToRemove = state.items.find(
                (item) => item.id === action.payload
            );

            if (!itemToRemove) return state;

            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
                totalItems: state.totalItems - itemToRemove.quantity,
                totalPrice: state.totalPrice - itemToRemove.subTotal,
            };
        }

        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                return cartReducer(state, { type: "REMOVE_ITEM", payload: id });
            }

            const updatedItems = state.items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity,
                          subTotal: quantity * item.price,
                      }
                    : item
            );

            const newTotalItems = updatedItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            const newTotalPrice = updatedItems.reduce(
                (sum, item) => sum + item.subTotal,
                0
            );

            return {
                ...state,
                items: updatedItems,
                totalItems: newTotalItems,
                totalPrice: newTotalPrice,
            };
        }

        case "CLEAR_CART":
            return {
                items: [],
                totalItems: 0,
                totalPrice: 0,
            };

        default:
            return state;
    }
};

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (product: Product) => {
        dispatch({ type: "ADD_ITEM", payload: product });
    };

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const value: CartContextType = {
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    };

    return <CartContext value={value}>{children}</CartContext>;
};
