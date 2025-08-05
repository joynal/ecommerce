import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "./cartReducer.tsx";
import { useCart } from "../hooks/useCart.ts";
import type { Product } from "../components/types.ts";

const TestCartComponent = () => {
    const { state, addItem, removeItem, updateQuantity, clearCart } = useCart();

    const mockProduct: Product = {
        id: "1",
        name: "Test Product",
        price: 10.99,
        description: "A test product",
        features: ["test-feature"],
    };

    const mockProduct2: Product = {
        id: "2",
        name: "Test Product 2",
        price: 15.5,
        description: "Another test product",
        features: ["test-feature"],
    };

    return (
        <div>
            <div data-testid="total-items">{state.totalItems}</div>
            <div data-testid="total-price">{state.totalPrice.toFixed(2)}</div>
            <div data-testid="items-count">{state.items.length}</div>

            {state.items.map((item) => (
                <div key={item.id} data-testid={`item-${item.id}`}>
                    <span data-testid={`item-${item.id}-name`}>
                        {item.name}
                    </span>
                    <span data-testid={`item-${item.id}-quantity`}>
                        {item.quantity}
                    </span>
                    <span data-testid={`item-${item.id}-subtotal`}>
                        {item.subTotal.toFixed(2)}
                    </span>
                </div>
            ))}

            <button
                onClick={() => addItem(mockProduct)}
                data-testid="add-product-1"
            >
                Add Product 1
            </button>
            <button
                onClick={() => addItem(mockProduct2)}
                data-testid="add-product-2"
            >
                Add Product 2
            </button>
            <button
                onClick={() => removeItem("1")}
                data-testid="remove-product-1"
            >
                Remove Product 1
            </button>
            <button
                onClick={() => updateQuantity("1", 3)}
                data-testid="update-quantity-1"
            >
                Update Product 1 to 3
            </button>
            <button
                onClick={() => updateQuantity("1", 0)}
                data-testid="update-quantity-1-zero"
            >
                Update Product 1 to 0
            </button>
            <button onClick={clearCart} data-testid="clear-cart">
                Clear Cart
            </button>
        </div>
    );
};

const renderCartProvider = () => {
    return render(
        <CartProvider>
            <TestCartComponent />
        </CartProvider>
    );
};

describe("CartProvider and cartReducer", () => {
    describe("Initial State", () => {
        it("should have empty cart on initial load", () => {
            renderCartProvider();

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
        });
    });

    describe("ADD_ITEM action", () => {
        it("should add a new item to empty cart", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            await user.click(screen.getByTestId("add-product-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("1");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "10.99"
            );
            expect(screen.getByTestId("items-count")).toHaveTextContent("1");
            expect(screen.getByTestId("item-1-name")).toHaveTextContent(
                "Test Product"
            );
            expect(screen.getByTestId("item-1-quantity")).toHaveTextContent(
                "1"
            );
            expect(screen.getByTestId("item-1-subtotal")).toHaveTextContent(
                "10.99"
            );
        });

        it("should increment quantity when adding existing item", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add same product twice
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("2");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "21.98"
            );
            expect(screen.getByTestId("items-count")).toHaveTextContent("1"); // Still one unique item
            expect(screen.getByTestId("item-1-quantity")).toHaveTextContent(
                "2"
            );
            expect(screen.getByTestId("item-1-subtotal")).toHaveTextContent(
                "21.98"
            );
        });

        it("should add multiple different items", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-2"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("2");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "26.49"
            ); // 10.99 + 15.50
            expect(screen.getByTestId("items-count")).toHaveTextContent("2");
            expect(screen.getByTestId("item-1-quantity")).toHaveTextContent(
                "1"
            );
            expect(screen.getByTestId("item-2-quantity")).toHaveTextContent(
                "1"
            );
        });
    });

    describe("REMOVE_ITEM action", () => {
        it("should remove item from cart", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add item then remove it
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("remove-product-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
            expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
        });

        it("should remove item with quantity > 1", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add same item twice then remove
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("remove-product-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
        });

        it("should handle removing non-existent item gracefully", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Try to remove item that doesn't exist
            await user.click(screen.getByTestId("remove-product-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
        });

        it("should remove only the specified item when multiple items exist", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add two different products
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-2"));

            // Remove first product
            await user.click(screen.getByTestId("remove-product-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("1");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "15.50"
            );
            expect(screen.getByTestId("items-count")).toHaveTextContent("1");
            expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
            expect(screen.getByTestId("item-2")).toBeInTheDocument();
        });
    });

    describe("UPDATE_QUANTITY action", () => {
        it("should update item quantity", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add item then update quantity
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("update-quantity-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("3");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "32.97"
            ); // 10.99 * 3
            expect(screen.getByTestId("item-1-quantity")).toHaveTextContent(
                "3"
            );
            expect(screen.getByTestId("item-1-subtotal")).toHaveTextContent(
                "32.97"
            );
        });

        it("should remove item when quantity is set to 0", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add item then set quantity to 0
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("update-quantity-1-zero"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
            expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
        });

        it("should handle updating non-existent item gracefully", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Try to update item that doesn't exist
            await user.click(screen.getByTestId("update-quantity-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
        });

        it("should recalculate totals correctly when updating quantity", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add two different products
            await user.click(screen.getByTestId("add-product-1")); // 10.99
            await user.click(screen.getByTestId("add-product-2")); // 15.50

            // Update first product quantity to 3
            await user.click(screen.getByTestId("update-quantity-1"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("4"); // 3 + 1
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "48.47"
            ); // (10.99 * 3) + 15.50
            expect(screen.getByTestId("item-1-quantity")).toHaveTextContent(
                "3"
            );
            expect(screen.getByTestId("item-2-quantity")).toHaveTextContent(
                "1"
            );
        });
    });

    describe("CLEAR_CART action", () => {
        it("should clear empty cart", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            await user.click(screen.getByTestId("clear-cart"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
        });

        it("should clear cart with single item", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("clear-cart"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
            expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
        });

        it("should clear cart with multiple items", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add multiple items with different quantities
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-2"));

            await user.click(screen.getByTestId("clear-cart"));

            expect(screen.getByTestId("total-items")).toHaveTextContent("0");
            expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
            expect(screen.getByTestId("items-count")).toHaveTextContent("0");
            expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
            expect(screen.queryByTestId("item-2")).not.toBeInTheDocument();
        });
    });

    describe("Complex scenarios", () => {
        it("should handle adding, updating, and removing items in sequence", async () => {
            const user = userEvent.setup();
            renderCartProvider();

            // Add items
            await user.click(screen.getByTestId("add-product-1"));
            await user.click(screen.getByTestId("add-product-2"));
            await user.click(screen.getByTestId("add-product-1")); // quantity: 2

            expect(screen.getByTestId("total-items")).toHaveTextContent("3");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "37.48"
            ); // (10.99 * 2) + 15.50

            // Update quantity
            await user.click(screen.getByTestId("update-quantity-1"));
            expect(screen.getByTestId("total-items")).toHaveTextContent("4"); // 3 + 1
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "48.47"
            ); // (10.99 * 3) + 15.50

            // Remove one item
            await user.click(screen.getByTestId("remove-product-1"));
            expect(screen.getByTestId("total-items")).toHaveTextContent("1");
            expect(screen.getByTestId("total-price")).toHaveTextContent(
                "15.50"
            );
            expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
            expect(screen.getByTestId("item-2")).toBeInTheDocument();
        });
    });
});
