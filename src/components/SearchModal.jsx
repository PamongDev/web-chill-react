import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard"
import "../styles/search.css"

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const { movies, series } = useMovies();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const AllMoviesSeries = [...(movies || []), ...(series || [])];

    // Auto-focus ke kolom pencarian saat modal terbuka
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        } else {
            // Bersihkan teks saat modal ditutup
            setQuery("");
        }
    }, [isOpen]);

    // Live search langsung menyaring semua film (tanpa dibatasi 4)
    const results = useMemo(() => {
        if (!query.trim() || !AllMoviesSeries) return [];
        
        const keyword = query.toLowerCase();
        return AllMoviesSeries.filter(m => m.title.toLowerCase().includes(keyword));
    }, [query, AllMoviesSeries]);

    if (!isOpen) return null;

    // Aksi saat kartu di dalam modal diklik
    const handleMovieClick = () => {
        onClose(); // Tutup modal saat user memilih film
    };

    return (
        <div className="search-modal-overlay">
            {/* --- BAGIAN ATAS: KOLOM SEARCH --- */}
            <div className="search-modal-top">
                <div className="container search-modal-header">
                    <svg className="search-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    
                    <input 
                        ref={inputRef}
                        type="text" 
                        className="search-modal-input"
                        placeholder="Ketik judul film, series, atau aktor..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <button className="search-close-btn" onClick={onClose} aria-label="Tutup pencarian">
                        Batal
                    </button>
                </div>
            </div>

            {/* --- BAGIAN BAWAH: HASIL GRID (SCROLLABLE) --- */}
            <div className="search-modal-body container">
                {query.trim() === "" ? (
                    <div className="search-empty-state">
                        <p>Cari tontonan favoritmu hari ini.</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="movie-grid" onClick={handleMovieClick}>
                        {results.map(movie => (
                            <MovieCard key={movie.id} movie={movie} badge={false}/>
                        ))}
                    </div>
                ) : (
                    <div className="search-empty-state">
                        <p>Waduh, <span>"{query}"</span> tidak ditemukan di Chill.</p>
                    </div>
                )}
            </div>
        </div>
    );
}