import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

const cartPageStyles = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
};

const titleStyles = {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#ffffff",
    fontWeight: "700",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
};

const emptyCartStyles = {
    textAlign: "center" as const,
    padding: "4rem 2rem",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backdrop: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
};

const cartItemsStyles = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
    marginBottom: "2rem",
};

const cartItemStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "grid",
    gridTemplateColumns: "1fr auto auto auto",
    gap: "1.5rem",
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    },
    "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
        gap: "1rem",
        padding: "1.5rem",
    },
};

const itemInfoStyles = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
};

const itemNameStyles = {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "0.25rem",
};

const itemPriceStyles = {
    color: "#667eea",
    fontSize: "1.1rem",
    fontWeight: "500",
};

const quantityControlsStyles = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: "#f7fafc",
    padding: "0.5rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
};

const quantityButtonStyles = {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "#5a67d8",
        transform: "scale(1.05)",
    },
    "&:active": {
        transform: "scale(0.95)",
    },
    "&:disabled": {
        backgroundColor: "#a0aec0",
        cursor: "not-allowed",
        opacity: 0.6,
        transform: "none",
    },
};

const quantityDisplayStyles = {
    padding: "0.5rem 1rem",
    minWidth: "3rem",
    textAlign: "center" as const,
    color: "#2d3748",
    fontSize: "1.1rem",
    fontWeight: "600",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
};

const subtotalStyles = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#667eea",
    textAlign: "right" as const,
};

const removeButtonStyles = {
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1.25rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "#c53030",
        transform: "translateY(-1px)",
    },
    "&:active": {
        transform: "translateY(0)",
    },
};

const cartSummaryStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginTop: "2rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
};

const summaryRowStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
    borderBottom: "1px solid #e2e8f0",
    color: "#4a5568",
    fontSize: "1.1rem",
};

const totalRowStyles = {
    ...summaryRowStyles,
    borderBottom: "none",
    fontSize: "1.4rem",
    fontWeight: "700",
    marginTop: "1rem",
    paddingTop: "1.5rem",
    borderTop: "2px solid #667eea",
    color: "#2d3748",
};

const checkoutButtonStyles = {
    width: "100%",
    padding: "1.25rem 2rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1.5rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    },
    "&:active": {
        transform: "translateY(0)",
    },
};

const backButtonStyles = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#4a5568",
    textDecoration: "none",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.2s ease",
    fontWeight: "500",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 1)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
};

const clearCartButtonStyles = {
    backgroundColor: "#718096",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1.5rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
    marginBottom: "1rem",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "#4a5568",
        transform: "translateY(-1px)",
    },
};

const headerContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "1.5rem",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
};

const summaryHeaderStyles = {
    color: "#2d3748",
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    fontWeight: "600",
};

const emptyCartTextStyles = {
    color: "#4a5568",
    fontSize: "1.1rem",
    marginBottom: "2rem",
    lineHeight: "1.6",
};

const emptyCartTitleStyles = {
    ...titleStyles,
    color: "#2d3748",
    marginBottom: "1rem",
};

export const Cart = () => {
    const { state, updateQuantity, removeItem, clearCart } = useCart();

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(id);
        } else {
            updateQuantity(id, newQuantity);
        }
    };

    const handleClearCart = () => {
        if (confirm("Are you sure you want to clear your cart?")) {
            clearCart();
        }
    };

    if (state.items.length === 0) {
        return (
            <div css={cartPageStyles}>
                <Link
                    to="/"
                    css={backButtonStyles}
                    data-testid="continue-shopping"
                >
                    ← Continue Shopping
                </Link>
                <div css={emptyCartStyles}>
                    <h1
                        css={emptyCartTitleStyles}
                        data-testid="empty-cart-title"
                    >
                        Your cart is empty
                    </h1>
                    <p css={emptyCartTextStyles}>
                        Add some products to your cart to see them here.
                    </p>
                    <Link
                        to="/"
                        css={{
                            ...checkoutButtonStyles,
                            width: "auto",
                            display: "inline-block",
                            textDecoration: "none",
                        }}
                        data-testid="browse-products"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div css={cartPageStyles}>
            <Link to="/" css={backButtonStyles}>
                ← Continue Shopping
            </Link>

            <div css={headerContainerStyles}>
                <h1 css={titleStyles}>Your Cart ({state.totalItems} items)</h1>
                <button css={clearCartButtonStyles} onClick={handleClearCart}>
                    Clear Cart
                </button>
            </div>

            <div css={cartItemsStyles}>
                {state.items.map((item) => (
                    <div
                        key={item.id}
                        css={cartItemStyles}
                        data-testid="cart-item"
                    >
                        <div css={itemInfoStyles}>
                            <h3 css={itemNameStyles} data-testid="item-name">
                                {item.name}
                            </h3>
                            <p css={itemPriceStyles}>
                                ${item.price.toFixed(2)} each
                            </p>
                        </div>

                        <div css={quantityControlsStyles}>
                            <button
                                css={quantityButtonStyles}
                                onClick={() =>
                                    handleQuantityChange(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                                disabled={item.quantity <= 1}
                                data-testid="decrease-quantity"
                            >
                                −
                            </button>
                            <span
                                css={quantityDisplayStyles}
                                data-testid="quantity-display"
                            >
                                {item.quantity}
                            </span>
                            <button
                                css={quantityButtonStyles}
                                onClick={() =>
                                    handleQuantityChange(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                                data-testid="increase-quantity"
                            >
                                +
                            </button>
                        </div>

                        <div css={subtotalStyles} data-testid="item-subtotal">
                            ${item.subTotal.toFixed(2)}
                        </div>

                        <button
                            css={removeButtonStyles}
                            onClick={() => removeItem(item.id)}
                            data-testid="remove-item"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div css={cartSummaryStyles} data-testid="cart-summary">
                <h3 css={summaryHeaderStyles}>Order Summary</h3>

                <div css={summaryRowStyles} data-testid="subtotal-row">
                    <span>Subtotal ({state.totalItems} items):</span>
                    <span
                        css={{ fontWeight: "600" }}
                        data-testid="subtotal-amount"
                    >
                        ${state.totalPrice.toFixed(2)}
                    </span>
                </div>

                <div css={summaryRowStyles}>
                    <span>Shipping:</span>
                    <span css={{ fontWeight: "600", color: "#38a169" }}>
                        Free
                    </span>
                </div>

                <div css={summaryRowStyles}>
                    <span>Tax (8%):</span>
                    <span css={{ fontWeight: "600" }}>
                        ${(state.totalPrice * 0.08).toFixed(2)}
                    </span>
                </div>

                <div css={totalRowStyles} data-testid="total-row">
                    <span>Total:</span>
                    <span css={{ color: "#667eea" }} data-testid="total-amount">
                        ${(state.totalPrice * 1.08).toFixed(2)}
                    </span>
                </div>

                <button
                    css={checkoutButtonStyles}
                    data-testid="checkout-button"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};
