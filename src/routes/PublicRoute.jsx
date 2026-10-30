import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    if (userLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}