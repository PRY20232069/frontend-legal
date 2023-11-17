import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("sign-in");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
