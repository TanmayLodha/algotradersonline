import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  //Load the user from storage
  useEffect(() => {
    const u = localStorage.getItem("user");
    u && JSON.parse(u) ? setUser(true) : setUser(false);
  }, []);

  // store user inn localstorage
  // everytime user changes
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={<Login authenticate={() => setUser(true)} />}
          />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {user && (
        <>
          <Route
            path="/dashboard"
            element={<Dashboard removeUser={() => setUser(false)} />}
          />
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
