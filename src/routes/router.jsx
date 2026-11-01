import { createBrowserRouter } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/home/Home";
import Profile from "../pages/home/Profile";
import Playlist from "../pages/home/Playlist";
import Movies from "../pages/home/Movies";
import Series from "../pages/home/Series";
import DetailMovie from "../pages/home/DetailMovie";
import DetailSeries from "../pages/home/DetailSeries";
import GenrePage from "../pages/home/GenrePage";
import NotFound from "../pages/error/NotFound";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
    // --- GUEST / PUBLIC ROUTES (Hanya untuk yang BELUM Login) ---
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/sign-in",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },

    // --- PROTECTED ROUTES (Hanya untuk yang SUDAH Login) ---
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/playlist",
                element: <Playlist />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/series",
                element: <Series />,
            },
            {
                path: "/movies/detail/:id",
                element: <DetailMovie />,
            },
            {
                path: "/series/detail/:id",
                element: <DetailSeries />,
            },
            {
                path: "/movies/genre/:genreName",
                element: <GenrePage defaultType="movie" />,
            },
            {
                path: "/series/genre/:genreName",
                element: <GenrePage defaultType="series" />,
            },
            {
                path: "/a/genre/:genreName",
                element: <GenrePage defaultType="all" />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);