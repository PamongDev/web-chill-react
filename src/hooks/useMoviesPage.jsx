import { useState, useMemo } from "react";
import { useMovies } from "./useMovies";
import { useAuth } from "./useAuth";

export function useMoviesPage() {
    const { movies = [], isLoading } = useMovies();
    const { user, handleLogout } = useAuth();
    const [visibleCount, setVisibleCount] = useState(12);

    const { onlyMovies, heroMovie, genreCollections } = useMemo(() => {
        if (!movies.length) return { onlyMovies: [], heroMovie: [], genreCollections: [] };

        // Filter hanya film (bukan series)
        const filteredMovies = movies.filter((m) => !m.seasons);
        const hero = filteredMovies.slice(0, 5);

        // Ambil daftar genre unik
        const allGenres = [...new Set(filteredMovies.flatMap((m) => m.genres || []))];

        // Kelompokkan film berdasarkan genre dengan penambalan data jika kurang dari 8
        const collections = allGenres.map((genre) => {
            let genreMovies = filteredMovies.filter((m) => m.genres?.includes(genre));
            const targetLength = 8;

            if (genreMovies.length < targetLength) {
                const deficit = targetLength - genreMovies.length;
                const availableFillers = filteredMovies.filter(
                    (m) => !genreMovies.some((gm) => gm.id === m.id)
                );

                const randomFillers = [...availableFillers]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, deficit);

                genreMovies = [...genreMovies, ...randomFillers];
            }

            return {
                genreName: genre,
                movies: genreMovies,
            };
        });

        return {
            onlyMovies: filteredMovies,
            heroMovie: hero,
            genreCollections: collections,
        };
    }, [movies]);

    const displayedMovies = useMemo(
        () => onlyMovies.slice(0, visibleCount),
        [onlyMovies, visibleCount]
    );

    const hasMore = visibleCount < onlyMovies.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    return {
        user,
        handleLogout,
        isLoading,
        onlyMovies,
        heroMovie,
        genreCollections,
        displayedMovies,
        hasMore,
        handleLoadMore,
    };
}