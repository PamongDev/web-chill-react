import { useState, useEffect } from "react";
import { shuffleArray, normalizeSeries, normalizeMovie } from '../utils/MovieHelper';

export function useMovies(){
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                // Pastikan file dummy-movie.json ada di folder public/data/
                const response = await fetch("../data/dummy-movie.json");
                if (!response.ok) throw new Error("Gagal mengambil data");
                
                const json = await response.json();

                const rawMovies = Array.isArray(json) ? json : json.movies;
                const rawSeries = Array.isArray(json) ? json : json.series;
                
               const normalizedMovies = rawMovies.map(normalizeMovie);
               const normalizedSeries = rawSeries.map(normalizeSeries);

               const shuffleMovies = shuffleArray(normalizedMovies);
               const shuffleSeries = shuffleArray(normalizedSeries);

               setMovies(shuffleMovies);
               setSeries(shuffleSeries);

            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMovies();
    }, []);
    return {movies, series, isLoading};
}