import { Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";

function ProtectedLayout() {
  return (
    <PrivateRoute>
      <Navbar />
      <Outlet />
    </PrivateRoute>
  );
}

export default ProtectedLayout;
