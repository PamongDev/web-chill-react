import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "./useMovies";
import { useAuth } from "./useAuth";

export function useGenrePage(defaultType = "all") {
    const { genreName = "" } = useParams();
    const { movies = [], series = [], isLoading } = useMovies();
    const { user, handleLogout } = useAuth();

    const [visibleCount, setVisibleCount] = useState(12);

    // Filter film berdasarkan genre & tipe (movie/series/all)
    const { genreMovies, totalCount } = useMemo(() => {
        const allMoviesSeries = [...movies, ...series];
        if (!allMoviesSeries.length || !genreName) {
            return { genreMovies: [], totalCount: 0 };
        }

        const targetGenre = genreName.toLowerCase();
        const filtered = allMoviesSeries.filter((m) => {
            const matchGenre = m.genres?.some(
                (g) => g.toLowerCase() === targetGenre
            );
            if (!matchGenre) return false;

            if (defaultType === "movie") return !m.seasons;
            if (defaultType === "series") return m.seasons && m.seasons.length > 0;
            return true;
        });

        return {
            genreMovies: filtered,
            totalCount: filtered.length,
        };
    }, [movies, series, genreName, defaultType]);

    const displayedMovies = useMemo(
        () => genreMovies.slice(0, visibleCount),
        [genreMovies, visibleCount]
    );

    const featuredMovies = useMemo(
        () => genreMovies.slice(0, 5),
        [genreMovies]
    );

    const hasMore = visibleCount < totalCount;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    const formattedGenreTitle = genreName
        ? genreName.charAt(0).toUpperCase() + genreName.slice(1)
        : "";

    return {
        user,
        handleLogout,
        genreName,
        formattedGenreTitle,
        isLoading,
        displayedMovies,
        featuredMovies,
        totalCount,
        hasMore,
        handleLoadMore,
    };
}