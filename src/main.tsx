import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import "./lib/bridge.js";
import "./styles/globals.css";

import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/dashboard", element: <Dashboard /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
