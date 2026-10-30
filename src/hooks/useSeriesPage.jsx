import { useState, useMemo } from "react";
import { useMovies } from "./useMovies";
import { useAuth } from "./useAuth";

export function useSeriesPage() {
    const { series = [], isLoading } = useMovies();
    const { user, handleLogout } = useAuth();
    const [visibleCount, setVisibleCount] = useState(12);

    const { onlySeries, heroSeries, genreCollections } = useMemo(() => {
        if (!series.length) return { onlySeries: [], heroSeries: [], genreCollections: [] };

        // Filter hanya item yang memiliki season (series)
        const filteredSeries = series.filter((m) => m.seasons && m.seasons.length > 0);
        const hero = filteredSeries.slice(0, 5);

        // Ambil daftar genre unik dari seluruh series
        const allGenres = [...new Set(filteredSeries.flatMap((m) => m.genres || []))];

        // Kelompokkan series berdasarkan genre dengan penambalan data jika kurang dari 8
        const collections = allGenres.map((genre) => {
            let genreSeries = filteredSeries.filter((m) => m.genres?.includes(genre));
            const targetLength = 8;

            if (genreSeries.length < targetLength) {
                const deficit = targetLength - genreSeries.length;
                const availableFillers = filteredSeries.filter(
                    (m) => !genreSeries.some((gm) => gm.id === m.id)
                );

                const randomFillers = [...availableFillers]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, deficit);

                genreSeries = [...genreSeries, ...randomFillers];
            }

            return {
                genreName: genre,
                series: genreSeries,
            };
        });

        return {
            onlySeries: filteredSeries,
            heroSeries: hero,
            genreCollections: collections,
        };
    }, [series]);

    const displayedMovies = useMemo(
        () => onlySeries.slice(0, visibleCount),
        [onlySeries, visibleCount]
    );

    const hasMore = visibleCount < onlySeries.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    return {
        user,
        handleLogout,
        isLoading,
        onlySeries,
        heroSeries,
        genreCollections,
        displayedMovies,
        hasMore,
        handleLoadMore,
    };
}