import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "./useMovies";
import { useAuth } from "./useAuth";
import { useMyList } from "./useMyList";
import { shareMovie } from "../utils/shareHelper";

export function useMovieDetail() {
    const { id } = useParams();
    const { user, handleLogout } = useAuth();
    const { movies, isLoading } = useMovies();
    const { toggleMyList, isInList } = useMyList();
    const [toastMessage, setToastMessage] = useState("");

    const movie = movies?.find((item) => item.id.toString() === id);
    const similarMovies = movies
        ? movies.filter((m) => m.id.toString() !== id).slice(0, 10)
        : [];
    const isAdded = movie ? isInList(movie.id) : false;

    const handleShare = async () => {
        if (!movie) return;
        const result = await shareMovie({
            title: movie.title,
            text: `Yuk nonton film ${movie.title} di Chill!`,
            url: window.location.href,
        });

        if (result.success && result.type === "clipboard") {
            setToastMessage("Link Berhasil disalin ke clipboard!");
            setTimeout(() => setToastMessage(""), 3000);
        }
    };

    return {
        user,
        handleLogout,
        movie,
        similarMovies,
        isLoading,
        isAdded,
        toastMessage,
        toggleMyList,
        handleShare,
    };
}