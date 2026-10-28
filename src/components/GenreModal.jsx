import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";

export default function GenreModal({ isOpen, onClose }) {
    const { movies, series } = useMovies();
    const navigate = useNavigate();
    const allMoviesSeries = [...(movies || []), ...(series || [])];

    // Mengambil semua genre unik dari seluruh data (Movie + Series) dan mengurutkannya sesuai abjad
    const allGenres = useMemo(() => {
        if (!allMoviesSeries) return [];
        const genres = [...new Set(allMoviesSeries.flatMap(m => m.genres || []))];
        return genres.sort(); // Urutkan A-Z agar rapi
    }, [allMoviesSeries]);

    // Jika modal tidak sedang dibuka, jangan render apa-apa
    if (!isOpen) return null;

    const handleGenreClick = (genre) => {
        onClose(); // Tutup modal dulu
        navigate(`/a/genre/${genre.toLowerCase()}`); // Lempar ke halaman GenrePage global
    };

    return (
        <div className="genre-modal-overlay" onClick={onClose}>
            <div className="genre-modal-content" onClick={(e) => e.stopPropagation()}>
                
                <div className="genre-modal-header">
                    <h2>Eksplorasi Kategori</h2>
                    <button className="close-modal-btn" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="genre-modal-body">
                    {allGenres.map(genre => (
                        <button 
                            key={genre} 
                            className="genre-capsule-btn"
                            onClick={() => handleGenreClick(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}