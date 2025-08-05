import { useParams, Link } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../hooks/useCart";
import type { Product } from "./types";

const productDetailsStyles = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
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
    backdropFilter: "blur(10px)",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 1)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
};

const productContainerStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "3rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
    "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
        gap: "2rem",
        padding: "2rem",
    },
};

const imagePlaceholderStyles = {
    width: "100%",
    height: "450px",
    background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#718096",
    fontSize: "1.2rem",
    fontWeight: "500",
    border: "2px dashed #e2e8f0",
    position: "relative" as const,
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
        transform: "translateX(-100%)",
        animation: "shimmer 2s infinite",
    },
};

const productInfoStyles = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2rem",
};

const titleStyles = {
    fontSize: "2.8rem",
    marginBottom: "0.5rem",
    color: "#2d3748",
    fontWeight: "700",
    lineHeight: "1.2",
};

const priceStyles = {
    fontSize: "2.2rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
};

const descriptionStyles = {
    lineHeight: 1.7,
    color: "#4a5568",
    fontSize: "1.1rem",
    backgroundColor: "#f7fafc",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
};

const featuresContainerStyles = {
    backgroundColor: "#f7fafc",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
};

const featuresHeaderStyles = {
    color: "#2d3748",
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "1rem",
};

const featuresListStyles = {
    color: "#4a5568",
    lineHeight: 1.8,
    paddingLeft: "1rem",
    "& li": {
        marginBottom: "0.5rem",
        position: "relative" as const,
        "&::before": {
            content: '"✓"',
            color: "#38a169",
            fontWeight: "bold",
            position: "absolute",
            left: "-1rem",
        },
    },
};

const addToCartButtonStyles = {
    padding: "1.25rem 2rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
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

const loadingStyles = {
    textAlign: "center" as const,
    padding: "4rem",
    color: "#ffffff",
    fontSize: "1.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
};

const notFoundStyles = {
    textAlign: "center" as const,
    padding: "4rem",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
    color: "#2d3748",
};

export const ProductDetails = () => {
    const { id } = useParams();
    const productId = id || null;
    const { data: product, loading } = useFetch<Product>(
        `/api/products/${productId}`
    );
    const { addItem, state } = useCart();

    const handleAddToCart = () => {
        if (product) {
            addItem(product);
        }
    };

    const isInCart = product
        ? state.items.some((item) => item.id === product.id)
        : false;
    const cartItem = product
        ? state.items.find((item) => item.id === product.id)
        : null;

    if (loading) {
        return (
            <div css={productDetailsStyles}>
                <Link to="/" css={backButtonStyles}>
                    ← Back to Home
                </Link>
                <div css={loadingStyles}>
                    <h3>Loading product details...</h3>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div css={productDetailsStyles}>
                <Link to="/" css={backButtonStyles}>
                    ← Back to Home
                </Link>
                <div css={notFoundStyles}>
                    <h1 css={{ fontSize: "2rem", marginBottom: "1rem" }}>
                        Product not found
                    </h1>
                    <p css={{ color: "#718096" }}>
                        The product you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div css={productDetailsStyles}>
            <Link to="/" css={backButtonStyles}>
                ← Back to Home
            </Link>

            <div css={productContainerStyles}>
                <div css={imagePlaceholderStyles}>
                    Product Image Placeholder
                </div>

                <div css={productInfoStyles}>
                    <h1 css={titleStyles}>{product.name}</h1>
                    <p css={priceStyles}>${product.price}</p>
                    <p css={descriptionStyles}>{product.description}</p>

                    <div css={featuresContainerStyles}>
                        <h3 css={featuresHeaderStyles}>Features:</h3>
                        <ul css={featuresListStyles}>
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        css={addToCartButtonStyles}
                        onClick={handleAddToCart}
                    >
                        {isInCart
                            ? `In Cart (${cartItem?.quantity})`
                            : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};
