import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Strategies from "./components/dashboard/Strategies";
import { UserContext } from "./UserContext";
import Profile from "./components/dashboard/Profile";

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  //Load the user from storage
  useEffect(() => {
    const u = localStorage.getItem("user");
    u ? setUser(u) : setUser(null);
  }, []);

  // store user in local storage everytime user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    }
  }, [user]);
  //[object Object]
  return (
    <UserContext.Provider value={providerValue}>
      <Routes>
        {!user && (
          <>
            <Route path="/*" element={<Landing />} />
          </>
        )}

        {user && (
          <>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
