import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    if (!userLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}