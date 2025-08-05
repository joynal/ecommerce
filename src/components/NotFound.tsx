import { Link } from "react-router";

const notFoundStyles = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "4rem 2rem",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
};

const titleStyles = {
    fontSize: "4rem",
    marginBottom: "1rem",
    color: "#ffffff",
    fontWeight: "700",
    textShadow: "0 4px 8px rgba(0,0,0,0.3)",
};

const subtitleStyles = {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "rgba(255, 255, 255, 0.8)",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

const linkStyles = {
    display: "inline-block",
    padding: "1rem 2rem",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    fontWeight: "600",
    fontSize: "1.1rem",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

const linkHoverStyles = {
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    },
};

export function NotFound() {
    return (
        <div css={notFoundStyles}>
            <h1 css={titleStyles}>404</h1>
            <p css={subtitleStyles}>
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                css={{
                    ...linkStyles,
                    ...linkHoverStyles,
                }}
            >
                Back to Home
            </Link>
        </div>
    );
}
