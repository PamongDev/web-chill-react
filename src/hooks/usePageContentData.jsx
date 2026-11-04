import { useMemo } from "react";
// Import hook yang baru kita buat
import { useUserData } from "./useUserData"; 

export function usePageContentData(movies = [], series = []) {

    const { watchHistory, watchlist } = useUserData();

    const continueWatching = useMemo(() => movies.slice(0, 15), [movies]);
    const topMovies = useMemo(() => movies.slice(1, 16), [movies]);
    const trending = useMemo(() => movies.slice(2, 17), [movies]);
    const newReleases = useMemo(() => movies.slice(-15), [movies]);

    const genres = useMemo(() => {
        if (!movies.length) return [];
        const usedIds = new Set();
        return [...new Set(movies.flatMap((m) => m.genres || []))]
            .map((name) => ({
                name,
                movies: movies.filter((m) => m.genres?.includes(name)),
            }))
            .sort((a, b) => a.movies.length - b.movies.length)
            .map(({ name, movies: list }) => {
                const movie = list.find((m) => !usedIds.has(m.id ?? m.title));
                if (!movie) return null;
                usedIds.add(movie.id ?? movie.title);
                return { name, movie };
            })
            .filter(Boolean)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [movies]);

    return {
        watchlist,     // Untuk dikirim ke halaman Playlist nanti
        watchHistory,  // Untuk dikirim ke Continue Watching
        continueWatching,
        topMovies,
        trending,
        newReleases,
        genres
    };
}