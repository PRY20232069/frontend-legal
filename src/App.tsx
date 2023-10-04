import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/routes";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component name={route.name} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
