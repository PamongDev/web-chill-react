import { useState, useMemo } from "react";
import { useMovies } from "../../hooks/useMovies";
import Header from "../../components/Header";
import FooterHome from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import MovieSection from "../../components/MovieSection"
import "../../styles/catalog.css"
import HeroSection from "../../components/HeroSection";
import FeaturedSection from "../../components/FeaturedSection";

export default function Series() {
    const { series, isLoading } = useMovies();
    const [visibleCount, setVisibleCount] = useState(12);

    const { onlySeries, heroSeries, genreCollections } = useMemo(() => {
        if (!series) return { onlySeries: [], heroSeries: null, genreCollections: [] };

        const filteredSeries = series.filter(m => m.seasons);
        const hero = filteredSeries.slice(0,5);

        // Ambil daftar genre unik dari semua film
        const allGenres = [...new Set(filteredSeries.flatMap(m => m.genres || []))];
        
        // Kelompokkan film berdasarkan genrenya dengan trik "Padding Data"
        const collections = allGenres.map(genre => {
            // 1. Ambil film aslinya yang sesuai genre
            let genreSeries = filteredSeries.filter(m => m.genres?.includes(genre));
            
            // 2. Jika jumlahnya kurang dari 8, kita tambal
            const targetLength = 8;
            if (genreSeries.length < targetLength) {
                const deficit = targetLength - genreSeries.length;
                
                // Cari film yang belum ada di dalam genreSeries ini
                const availableFillers = filteredSeries.filter(
                    m => !genreSeries.some(gm => gm.id === m.id)
                );
                
                // Acak film yang tersisa dan ambil sebanyak 'deficit' (kekurangannya)
                const randomFillers = [...availableFillers]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, deficit);
                
                // Gabungkan film asli dengan film tambahan
                genreSeries = [...genreSeries, ...randomFillers];
            }

            return {
                genreName: genre,
                series: genreSeries
            };
        });

        return { 
            onlySeries: filteredSeries, 
            heroSeries: hero, 
            genreCollections: collections 
        };
    }, [series]);

    if (isLoading) return <div className="loading-screen">Memuat Film...</div>;
    if (onlySeries.length === 0) return <div className="error-screen">Belum ada film tersedia.</div>;

    const displayedMovies = onlySeries.slice(0, visibleCount);
    const hasMore = visibleCount < onlySeries.length;

    return (
        <div className="page-wrapper">
            <Header />

            <main className="catalog-page">
                {/* --- 1. HERO BANNER KHUSUS MOVIES --- */}
                <HeroSection topFiveMovies={heroSeries} />
                {genreCollections.map((collection, index) => {
                    if (collection.series.length < 3) return null;

                    const isFeatured = (index + 1) % 3 === 0;
                    if (isFeatured) {
                        return (
                            <FeaturedSection 
                                key={`featured-${index}`} 
                                movies={collection.series} 

                                titleEyebrow={`${collection.genreName} Highlights`} 
                            />
                        );
                    }

                    // 4. Jika giliran MovieSection (Bungkus dengan .page-content agar ada padding)
                    return (
                        <div 
                            className="page-content" 
                            key={`section-${index}`} 
                            style={{ 
                                marginTop: index === 0 ? "-2rem" : "0", // Minus margin hanya untuk baris paling pertama
                                position: "relative", 
                                zIndex: 10 
                            }}
                        >
                            <MovieSection 
                                eyebrow="" 
                                title={`${collection.genreName} Series`} 
                                linkTo={`/series/genre/${collection.genreName.toLowerCase()}`}
                                movies={collection.series} 
                                isLoading={isLoading} 
                            />
                        </div>
                    );
                })}

                {/* --- 3. KOLEKSI SEMUA FILM (GRID + LOAD MORE) --- */}
                <div className="catalog-section" style={{ marginTop: "4rem" }}>
                    <div className="catalog-controls">
                        <h3 className="catalog-section-title">Koleksi Semua Series</h3>
                        {/* Tombol filter dihapus sesuai permintaan */}
                    </div>

                    <div className="movie-grid">
                        {displayedMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="load-more-container">
                            <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + 12)}>
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <FooterHome />
        </div>
    );
}