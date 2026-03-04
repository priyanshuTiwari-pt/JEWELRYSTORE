import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import JewelryDetailPage from "./pages/JewelryDetailPage";
import UpdatePage from "./pages/UpdatePage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreatePage /> },
      { path: "jewelry/:id", element: <JewelryDetailPage /> },
      { path: "update/:id", element: <UpdatePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);