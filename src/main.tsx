import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter } from "react-router";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
