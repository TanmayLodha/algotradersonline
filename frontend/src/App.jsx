import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [token, setToken] = useState("");
  const [Auth, setAuth] = useState(false);

  const userLogin = (tok) => {
    if (tok !== undefined) {
      setToken(tok);
      setAuth(true);
      console.log(token);
    }
  };

  return (
    <Routes>
      {!Auth && (
        <>
          <Route path="/" element={<Landing token={token} />} />
          <Route path="/login" element={<Login userLogin={userLogin} />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {Auth && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={Auth ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
