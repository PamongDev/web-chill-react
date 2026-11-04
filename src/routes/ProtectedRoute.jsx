import { Navigate, Outlet } from "react-router-dom";
import { UserDataProvider } from "../hooks/useUserData";

export default function ProtectedRoute() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    if (!userLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <UserDataProvider>
            <Outlet />
        </UserDataProvider>
    );
}