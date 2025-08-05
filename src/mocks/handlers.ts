import { http, HttpResponse } from "msw";

const products = {
    A49iEB: {
        id: "A49iEB",
        name: "Premium Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 299,
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Premium leather headband",
            "Bluetooth 5.0 connectivity",
            "Quick charge (5 min = 2 hours playback)",
        ],
    },
    MmbTrI: {
        id: "MmbTrI",
        name: "Smart Watch",
        description: "Advanced fitness tracking and smart notifications",
        price: 199,
        features: [
            "Heart rate monitoring",
            "GPS tracking",
            "Water resistant (50m)",
            "7-day battery life",
            "Sleep tracking",
        ],
    },
    kcxX6Z: {
        id: "kcxX6Z",
        name: "Laptop Stand",
        description: "Ergonomic aluminum laptop stand for better posture",
        price: 79,
        features: [
            "Adjustable height and angle",
            "Premium aluminum construction",
            "Non-slip base",
            'Supports laptops up to 17"',
            "Foldable design",
        ],
    },
};

export const handlers = [
    http.get("/api/products", () => {
        return HttpResponse.json(Object.values(products));
    }),

    http.get<{ productId: string }>(
        "/api/products/:productId",
        ({ params }) => {
            if (params.productId && params.productId in products) {
                return HttpResponse.json(
                    products[params.productId as keyof typeof products]
                );
            }

            new HttpResponse("Not found", {
                status: 404,
                headers: {
                    "Content-Type": "text/plain",
                },
            });
        }
    ),
];
