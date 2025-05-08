import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
    },
    plugins: [react(), tailwindcss()],
});

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // passe das ggf. an
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "nord"], // gültige DaisyUI-Themes
        darkTheme: "dark", // verwendet prefers-color-scheme
    },
};
