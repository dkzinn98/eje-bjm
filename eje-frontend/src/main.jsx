import React from "react";
import ReactDOM from "react-dom/client"; // Import atualizado para React 18
import App from "./routes.jsx";

// Cria o root usando createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


