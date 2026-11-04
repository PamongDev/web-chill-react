import { useMemo } from "react";
import { useUserData } from "./useUserData"; // 1. Ganti import ke useUserData
import { useAuth } from "./useAuth";

export function usePlaylistPage() {
    // 2. Ambil watchlist dari useUserData
    const { watchlist = [] } = useUserData();
    const { user, handleLogout } = useAuth();

    const featuredMovies = useMemo(
        () => watchlist.slice(0, 4),
        [watchlist]
    );

    return {
        user,
        handleLogout,
        myList: watchlist, // 3. Alias ke `myList` agar komponen PlaylistPage UI tidak error
        watchlist,
        featuredMovies,
        isEmpty: watchlist.length === 0,
    };
}