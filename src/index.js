import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HelmetProvider>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <App />
    </HelmetProvider>
  );
}

if (process.env.NODE_ENV === "development") {
  reportWebVitals(console.log);
}
