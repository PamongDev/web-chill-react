import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Lakukan pengecekan string secara eksplisit
    const isAuthenticated = userLoggedIn === "true" || userLoggedIn === "1";

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}