import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Home from "../pages/home/Home.jsx";
import Favorite from "../pages/home/Favorite.jsx";
import Setting from "../pages/home/Settings.jsx";
import HelpCenter from "../pages/home/HelpCenter.jsx";
import Profile from "../pages/home/Profile.jsx";
import Playlist from "../pages/home/Playlist.jsx";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <Home />
    },
    {
        path : "/sign-in",
        element : <Login />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : "/forgot-password",
        element : <ForgotPassword />
    },
    {
        path : "/favorites",
        element : <Favorite />
    },
    {
        path : "/help",
        element : <HelpCenter />
    },
    {
        path : "/playlist",
        element : <Playlist />
    },
    {
        path : "/profile",
        element : <Profile />
    },
    {
        path : "/settings",
        element : <Setting />
    },
])