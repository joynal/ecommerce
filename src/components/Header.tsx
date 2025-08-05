import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

const headerStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "1rem 2rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: "2rem",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.1)",
};

const navStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1280px",
    margin: "0 auto",
};

const logoStyles = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#ffffff",
    textDecoration: "none",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease",
    "&:hover": {
        transform: "scale(1.05)",
    },
};

const navLinksStyles = {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
};

const linkStyles = {
    color: "rgba(255, 255, 255, 0.9)",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "&:hover": {
        color: "#ffffff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transform: "translateY(-1px)",
    },
};

const cartBadgeStyles = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    position: "relative" as const,
    color: "rgba(255, 255, 255, 0.9)",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    padding: "0.75rem 1.25rem",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
        color: "#ffffff",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
};

const cartCountStyles = {
    backgroundColor: "#ff6b6b",
    color: "white",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    fontWeight: "700",
    boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
    animation: "pulse 2s infinite",
};

export const Header = () => {
    const { state } = useCart();

    return (
        <header css={headerStyles}>
            <nav css={navStyles}>
                <Link to="/" css={logoStyles}>
                    E-Commerce
                </Link>
                <ul css={navLinksStyles}>
                    <li>
                        <Link to="/" css={linkStyles}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" css={cartBadgeStyles}>
                            <span>Cart</span>
                            {state.totalItems > 0 && (
                                <span css={cartCountStyles}>
                                    {state.totalItems}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
