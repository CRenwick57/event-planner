import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { CurrentUserProvider } from "./CurrentUserContext.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AddEvent from "./components/AddEvent.jsx";
import Help from "./components/Help.jsx";
import UpdateEvent from "./components/UpdateEvent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-event",
    element: (
      <RequireAuth>
        <AddEvent />
      </RequireAuth>
    ),
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/update-event-details",
    element: (
      <RequireAuth>
        <UpdateEvent />
      </RequireAuth>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrentUserProvider>
      <RouterProvider router={router} />
    </CurrentUserProvider>
  </StrictMode>
);
