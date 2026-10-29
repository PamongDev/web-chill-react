import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/Header";
import FooterHome from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import FeaturedSection from "../../components/FeaturedSection";

export default function GenrePage({ defaultType = "all" }){

    const { genreName } = useParams();
    const { movies, series, isLoading } = useMovies();
    const {user, handleLogout} = useAuth();
    
    const allMoviesSeries = [...(movies || []), ...(series || [])];
    
    const [visibleCount, setVisibleCount] = useState(12);

    const { genreMovies, totalCount } = useMemo(()=>{
        if (!allMoviesSeries) return { genreMovies:[], totalCount: 0 };

        const targetGenre = genreName.toLowerCase();
        const filteredMovies = allMoviesSeries.filter(m=>{

            let matchGenre = m.genres?.some(g=>g.toLowerCase() === targetGenre);
            if (!matchGenre) return false;

            if(defaultType === "movie") return !m.seasons;
            if(defaultType === "series") return m.seasons && m.seasons.length > 0;
            if(defaultType === "all") return true;
            
        }) 

        return { genreMovies: filteredMovies, 
            totalCount: filteredMovies.length };
    }, [allMoviesSeries, genreName, defaultType]);
    
    if (isLoading) return <div className="loading-screen">Memuat {genreName}...</div>;
    
    const displayedMovies = genreMovies.slice(0, visibleCount);
    const hasMore = visibleCount < totalCount;
    
    if(!user) return null;
    return(
        <>
            <Header username={user.username} email={user.email} handleLogout={handleLogout}/>
            <FeaturedSection 
                movies={genreMovies.slice(0,5)} 
                titleEyebrow={`${genreName} Highlights`} 
                hero={true}
            />


            <main className="catalog-page">
                <div className="catalog-section">                   
                    <div className="catalog-controls">
                        <div>
                            <p className="eyebrow">
                                EKSPLORASI KATEGORI
                            </p>
                            <h2 className="catalog-section-title" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
                                {genreName.charAt(0).toUpperCase() + genreName.slice(1)} Collections <span style={{ color: "#777", fontSize: "1.2rem", fontWeight: "normal" }}>({totalCount})</span>
                            </h2>
                        </div>
                    </div>

                    {/* --- KONDISI KOSONG ATAU GRID --- */}
                    {totalCount === 0 ? (
                        <div className="empty-state">
                            <h3>Wah, kosong nih!</h3>
                            <p>Belum ada koleksi film atau series untuk genre <span>{genreName}</span>.</p>
                        </div>
                    ) : (
                        <>
                            <div className="movie-grid">
                                {displayedMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>

                            {/* --- TOMBOL LOAD MORE --- */}
                            {hasMore && (
                                <div className="load-more-container">
                                    <button 
                                        className="load-more-btn" 
                                        onClick={() => setVisibleCount(prev => prev + 12)}
                                    >
                                        Muat Lebih Banyak
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <FooterHome />
        </>
    );
}