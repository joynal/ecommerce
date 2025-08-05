import { Link } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Product } from "./types.ts";

const homeStyles = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center" as const,
};

const titleStyles = {
    fontSize: "3.5rem",
    marginBottom: "1rem",
    color: "#ffffff",
    fontWeight: "700",
    textShadow: "0 4px 8px rgba(0,0,0,0.3)",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};

const subtitleStyles = {
    fontSize: "1.3rem",
    marginBottom: "3rem",
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "300",
    lineHeight: "1.6",
};

const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
};

const cardStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textDecoration: "none",
    color: "inherit",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(255, 255, 255, 1)",
    },
};

const cardTitleStyles = {
    fontSize: "1.6rem",
    marginBottom: "1rem",
    color: "#2d3748",
    fontWeight: "600",
};

const cardDescriptionStyles = {
    color: "#4a5568",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
    fontSize: "1rem",
};

const priceStyles = {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#667eea",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};

const loadingStyles = {
    color: "#ffffff",
    fontSize: "1.5rem",
    padding: "3rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    margin: "2rem auto",
    maxWidth: "400px",
};

export const Home = () => {
    const { data: products, loading } = useFetch<Product[]>("/api/products");

    return (
        <div css={homeStyles}>
            <h1 css={titleStyles}>Welcome to Our Store</h1>
            <p css={subtitleStyles}>
                Discover amazing products with unbeatable quality and service
            </p>

            {loading && (
                <div css={loadingStyles}>
                    <h3>Loading amazing products...</h3>
                </div>
            )}

            {products && (
                <div css={gridStyles}>
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            css={cardStyles}
                            data-testid="product-card"
                        >
                            <h3 css={cardTitleStyles}>{product.name}</h3>
                            <p css={cardDescriptionStyles}>
                                {product.description}
                            </p>
                            <p css={priceStyles}>${product.price}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
