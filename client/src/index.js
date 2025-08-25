import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from './MainApp'// ✅ make sure this path is correct
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

reportWebVitals();
