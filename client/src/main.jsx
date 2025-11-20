import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import CustomLoader from "./components/ui/CustomLoader ";
import { ThemeProvider } from "./components/ThemeProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CustomLoader>
        <App />
        <Toaster />
      </CustomLoader>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
