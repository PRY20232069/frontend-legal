import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import Header from "./components/shared/layout/header/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component name={route.name} />}
            />
          ))}
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
