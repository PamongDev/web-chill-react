import { useMemo } from "react";
import { useMyList } from "./useMyList";
import { useAuth } from "./useAuth";

export function usePlaylistPage() {
    const { myList = [] } = useMyList();
    const { user, handleLogout } = useAuth();

    const featuredMovies = useMemo(
        () => myList.slice(0, 4),
        [myList]
    );

    return {
        user,
        handleLogout,
        myList,
        featuredMovies,
        isEmpty: myList.length === 0,
    };
}