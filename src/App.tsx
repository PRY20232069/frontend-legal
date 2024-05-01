import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import Header from "./components/shared/layout/header/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import ProtectedRoutes from "./components/shared/layout/ProtectedRoutes";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#193A32",
    },
    secondary: {
      main: "#E1F9F7",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
    },
    fontFamily: "Helvetica",
  },
});

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <route.component name={route.name} {...route.props} />
                  }
                />
              ))}
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
