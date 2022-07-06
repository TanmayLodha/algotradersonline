import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "./ColorModeContext";
import { UserContext } from "./UserContext";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/root/Dashboard";
import ForgotPass from "./components/login/ForgotPass";
import { Routes, Route, Navigate } from "react-router-dom";

const getDesignTokens = (mode) => ({
  typography: {
    allVariants: {
      fontFamily: ["Noto Sans", "sans-serif"].join(","),
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "rgb(104,115,250)",
          },

          secondary: {
            main: "rgb(104,115,250)",
          },

          background: {
            default: "rgb(246,246,248)",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#4D4A52",
            secondary: "#242135",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "rgb(104,115,250)",
          },

          secondary: {
            main: "rgb(104,115,250)",
          },

          background: {
            default: "rgb(35,37,57)",
            paper: "rgb(42,45,68)",
          },
          text: {
            primary: "#ffff",
            secondary: "#ffff",
          },
        }),
  },
});

function App() {
  //Themeing
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = createTheme(getDesignTokens(mode));

  //User
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={providerValue}>
          <Routes>
            {!user && (
              <>
                <Route path="" element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPass />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}

            {user && (
              <>
                <Route path="dashboard/*" element={<Dashboard />} />
              </>
            )}

            <Route
              path="*"
              element={<Navigate to={user ? "/dashboard" : "/"} />}
            />
          </Routes>
        </UserContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
