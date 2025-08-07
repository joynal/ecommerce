import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

async function deferRender() {
    const { worker } = await import("./mocks/browser.js");
    return worker.start();
}

deferRender().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
});
