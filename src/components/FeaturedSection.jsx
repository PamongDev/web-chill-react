import { useState } from "react";
import MovieCard from "./MovieCard";

export default function FeaturedSection({ movies, titleEyebrow="Best Featured for you today" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Ambil 5 film khusus untuk section ini
    const featuredMovies = movies ? movies.slice(0, 5) : [];

    if (featuredMovies.length === 0) return null;

    const activeMovie = featuredMovies[currentIndex];

    // Fungsi geser ke kanan
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    };

    return (
        <section className="featured-section">
            <div className="featured-backdrop">
                <img 
                    src={`/${activeMovie.bg || activeMovie.poster || activeMovie.thumbnail}`} 
                    alt={activeMovie.title} 
                />
                <div className="featured-overlay"></div>
            </div>

            {/* 2. KONTEN (Kiri) & SLIDER (Kanan) */}
            <div className="container featured-layout">
                
                {/* --- BAGIAN KIRI: Hero Content --- */}
                <div className="featured-content" key={activeMovie.id}>
                    <p className="eyebrow">Featured in Chill</p>
                    <h2 className="featured-eyebrow">{titleEyebrow}</h2>
                    
                    <div className="featured-movie-info">
                        <h3 className="hero-title">{activeMovie.title}</h3>
                        
                        <div className="hero-meta">
                            {activeMovie.year && <span>{activeMovie.year}</span>}
                            {activeMovie.rating && <span>{activeMovie.rating}</span>}
                            {activeMovie.duration && <span>{activeMovie.duration}</span>}
                            {activeMovie.rate && <span className="rate-text">⭐{activeMovie.rate}</span>}
                            
                        </div>
                        <div className="hero-meta">
                            {activeMovie.genres?.map((g, i) => (
                                <span key={i}>{g}</span>
                            ))}
                        </div>
                        
                        <p className="hero-description">{activeMovie.synopsis}</p>
                    </div>
                </div>

                {/* --- BAGIAN KANAN: Card Slider --- */}
                <div className="featured-slider-area">
                    <div className="featured-track">
                        {featuredMovies.map((movie, index) => {
                            // RUMUS RAHASIA SLIDER: 
                            // Menghitung jarak posisi kartu saat ini dengan currentIndex
                            const diff = (index - currentIndex + featuredMovies.length) % featuredMovies.length;
                            
                            // Tentukan class berdasarkan jaraknya
                            let positionClass = "";
                            if (diff === 0) positionClass = "card-active";        // Muncul penuh
                            else if (diff === 1) positionClass = "card-next-1";   // Antrean 1
                            else if (diff === 2) positionClass = "card-next-2";   // Antrean 2
                            else if (diff === 3) positionClass = "card-invisible"; // Sembunyi di kanan jauh
                            else positionClass = "card-hidden-left";              // Menghilang ke kiri!

                            return (
                                <div key={movie.id} className={`featured-card-wrapper ${positionClass}`}>
                                    <MovieCard movie={movie} badge={false}/>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tombol Geser Kanan */}
                    <button className="featured-next-btn" onClick={handleNext} aria-label="Next Featured">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

            </div>
            
        </section>
    );
}