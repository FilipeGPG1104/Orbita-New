import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Ponto de entrada da aplicação. Monta o componente <App /> dentro
// da div#root definida em index.html.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
