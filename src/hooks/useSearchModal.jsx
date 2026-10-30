import { useState, useMemo, useEffect, useRef } from "react";
import { useMovies } from "./useMovies";

export function useSearchModal(isOpen, onClose) {
    const [query, setQuery] = useState("");
    const { movies = [], series = [] } = useMovies();
    const inputRef = useRef(null);

    // Auto-focus & Reset Query saat modal dibuka/ditutup
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Listener tombol ESC untuk menutup modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Filter Film & Series secara efisien
    const results = useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return [];

        const combined = [...movies, ...series];
        return combined.filter((item) =>
            item.title?.toLowerCase().includes(trimmed)
        );
    }, [query, movies, series]);

    return {
        query,
        setQuery,
        inputRef,
        results,
    };
}