import { Navigate, Outlet } from "react-router-dom";
import { MyListProvider } from "../hooks/useMyList";

export default function ProtectedRoute() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    if (!userLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <MyListProvider>
            <Outlet />
        </MyListProvider>
    );
}