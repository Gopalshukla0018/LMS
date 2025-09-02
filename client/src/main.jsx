import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import CustomLoader from "./components/ui/CustomLoader ";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CustomLoader>
        <App />
        <Toaster />
      </CustomLoader>
    </Provider>
  </StrictMode>
);
