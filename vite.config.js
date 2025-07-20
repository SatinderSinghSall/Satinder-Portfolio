import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://satinder-portfolio-backend-codebase.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

//! The backend API URL is set to the production development URL.
// https://satinder-portfolio-backend-codebase.onrender.com

//! The backend API URL for the local development API is:
// http://localhost:5000
