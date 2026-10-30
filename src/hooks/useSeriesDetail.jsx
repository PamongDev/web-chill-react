import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "./useMovies";
import { useAuth } from "./useAuth";
import { useMyList } from "./useMyList";
import { shareMovie } from "../utils/shareHelper";

export function useSeriesDetail() {
    const { id } = useParams();
    const { user, handleLogout } = useAuth();
    const { series, isLoading } = useMovies();
    const { toggleMyList, isInList } = useMyList();

    const [activeSeason, setActiveSeason] = useState(0);
    const [toastMessage, setToastMessage] = useState("");

    const seriesItem = series?.find((item) => item.id.toString() === id);
    const similarSeries = series
        ? series.filter((s) => s.id.toString() !== id).slice(0, 10)
        : [];
    const isAdded = seriesItem ? isInList(seriesItem.id) : false;

    const handleShare = async () => {
        if (!seriesItem) return;
        const result = await shareMovie({
            title: seriesItem.title,
            text: `Yuk nonton series ${seriesItem.title} di Chill!`,
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
        seriesItem,
        similarSeries,
        isLoading,
        isAdded,
        activeSeason,
        setActiveSeason,
        toastMessage,
        toggleMyList,
        handleShare,
    };
}