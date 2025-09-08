import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import store from "@/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5001}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </HashRouter>
    </Provider>
  </StrictMode>
);
