import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import App from "./App";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import ForgotPassword from "./pages/ForgotPassword";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        {/* DEFAULT ROUTE */}

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* FORGOT PASSWORD */}

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<App />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>

);